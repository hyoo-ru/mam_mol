use std::any::Any;
use std::cell::RefCell;
use std::collections::HashMap;
use std::hash::Hash;
use std::marker::PhantomData;
use std::ops::Deref;
use std::rc::Rc;

#[derive(Clone, Copy, PartialEq, Eq, Hash, Debug)]
pub struct Id {
	idx: u32,
	gen: u32,
}

#[derive(Clone, Copy, PartialEq, PartialOrd, Debug)]
enum State {
	Fresh,
	Doubt,
	Stale,
}

#[derive(Clone, Copy, PartialEq, Debug)]
enum Kind {
	Atom,
	Auto,
	Obj,
	Map,
}

type Recalc = fn(Id);
type Detach = Box<dyn FnOnce(&mut Runtime)>;

struct Node {
	gen: u32,
	alive: bool,
	kind: Kind,
	state: State,
	busy: bool,
	solid: bool,
	root: bool,
	value: Option<Box<dyn Any>>,
	task: Option<Rc<dyn Any>>,
	recalc: Option<Recalc>,
	detach: Option<Detach>,
	owner: Option<Id>,
	kids: Vec<Id>,
	pubs: Vec<Id>,
	subs: Vec<Id>,
}

impl Node {
	fn new(gen: u32, kind: Kind, owner: Option<Id>, root: bool) -> Self {
		Self {
			gen,
			alive: true,
			kind,
			state: State::Stale,
			busy: false,
			solid: false,
			root,
			value: None,
			task: None,
			recalc: None,
			detach: None,
			owner,
			kids: Vec::new(),
			pubs: Vec::new(),
			subs: Vec::new(),
		}
	}
}

#[derive(Default)]
struct Runtime {
	nodes: Vec<Node>,
	free: Vec<u32>,
	current: Option<Id>,
	owner: Option<Id>,
	host: Option<Id>,
	queue: Vec<Id>,
	touched: Vec<Id>,
	orphans: Vec<Id>,
	scheduled: bool,
}

type Garbage = Vec<Box<dyn Any>>;

impl Runtime {
	fn get(&self, id: Id) -> Option<&Node> {
		self.nodes.get(id.idx as usize).filter(|n| n.alive && n.gen == id.gen)
	}

	fn get_mut(&mut self, id: Id) -> Option<&mut Node> {
		self.nodes.get_mut(id.idx as usize).filter(|n| n.alive && n.gen == id.gen)
	}

	fn node(&mut self, id: Id) -> &mut Node {
		self.get_mut(id).expect("$mol_wire: access to destroyed node")
	}

	fn alloc(&mut self, kind: Kind, root: bool) -> Id {
		let owner = if root { None } else { self.owner.filter(|o| self.get(*o).is_some()) };
		let id = match self.free.pop() {
			Some(idx) => {
				let gen = self.nodes[idx as usize].gen;
				self.nodes[idx as usize] = Node::new(gen, kind, owner, root);
				Id { idx, gen }
			}
			None => {
				self.nodes.push(Node::new(0, kind, owner, root));
				Id { idx: self.nodes.len() as u32 - 1, gen: 0 }
			}
		};
		match owner {
			Some(o) => self.node(o).kids.push(id),
			None if !root => self.orphan(id),
			None => {}
		}
		id
	}

	fn alive(&self) -> usize {
		self.nodes.iter().filter(|n| n.alive).count()
	}

	fn track(&mut self, dep: Id) {
		let Some(sub) = self.current else { return };
		if sub == dep {
			return;
		}
		let node = self.node(sub);
		if !node.pubs.contains(&dep) {
			node.pubs.push(dep);
		}
		let node = self.node(dep);
		if !node.subs.contains(&sub) {
			node.subs.push(sub);
		}
	}

	fn mark(&mut self, id: Id, state: State) {
		let mut stack = vec![(id, state)];
		while let Some((id, state)) = stack.pop() {
			let Some(node) = self.get_mut(id) else { continue };
			let was = node.state;
			if was >= state {
				continue;
			}
			node.state = state;
			if was != State::Fresh {
				continue;
			}
			if node.kind == Kind::Auto {
				self.queue.push(id);
				self.scheduled_check();
			}
			for sub in self.node(id).subs.clone() {
				stack.push((sub, State::Doubt));
			}
		}
	}

	fn touch(&mut self, id: Id) {
		self.touched.push(id);
		self.scheduled_check();
	}

	fn orphan(&mut self, id: Id) {
		self.orphans.push(id);
		self.scheduled_check();
	}

	fn scheduled_check(&mut self) {
		if !self.scheduled {
			self.scheduled = true;
			schedule();
		}
	}

	fn unlink_pubs(&mut self, id: Id) {
		for dep in std::mem::take(&mut self.node(id).pubs) {
			if let Some(node) = self.get_mut(dep) {
				node.subs.retain(|s| *s != id);
				if node.subs.is_empty() {
					self.touch(dep);
				}
			}
		}
	}

	fn adopt(&mut self, owner: Id, kid: Id) {
		let Some(node) = self.get(kid) else { return };
		if node.owner.is_some() || node.root {
			return;
		}
		self.node(kid).owner = Some(owner);
		self.node(owner).kids.push(kid);
	}

	fn release(&mut self, id: Id, keep: &[Id], garbage: &mut Garbage) {
		let kids = std::mem::take(&mut self.node(id).kids);
		let (kept, dropped): (Vec<Id>, Vec<Id>) = kids.into_iter().partition(|k| keep.contains(k));
		self.node(id).kids = kept;
		for kid in dropped {
			self.destroy(kid, garbage);
		}
	}

	fn evict(&mut self, id: Id, garbage: &mut Garbage) {
		let Some(node) = self.get(id) else { return };
		if node.kind != Kind::Atom || node.root || node.solid || node.busy || !node.subs.is_empty() {
			return;
		}
		if node.detach.is_some() {
			self.destroy(id, garbage);
			return;
		}
		self.unlink_pubs(id);
		self.release(id, &[], garbage);
		let node = self.node(id);
		node.state = State::Stale;
		if let Some(value) = node.value.take() {
			garbage.push(value);
		}
	}

	fn destroy(&mut self, id: Id, garbage: &mut Garbage) {
		let Some(node) = self.get_mut(id) else { return };
		node.alive = false;
		node.gen = node.gen.wrapping_add(1);
		let owner = node.owner;
		let kids = std::mem::take(&mut node.kids);
		let pubs = std::mem::take(&mut node.pubs);
		let subs = std::mem::take(&mut node.subs);
		let detach = node.detach.take();
		garbage.extend(node.value.take());
		if let Some(task) = node.task.take() {
			garbage.push(Box::new(task));
		}
		self.free.push(id.idx);

		if let Some(owner) = owner.and_then(|o| self.get_mut(o)) {
			owner.kids.retain(|k| *k != id);
		}
		for dep in pubs {
			if let Some(node) = self.get_mut(dep) {
				node.subs.retain(|s| *s != id);
				if node.subs.is_empty() {
					self.touch(dep);
				}
			}
		}
		for sub in subs {
			if let Some(node) = self.get_mut(sub) {
				node.pubs.retain(|p| *p != id);
			}
			self.mark(sub, State::Stale);
		}
		for kid in kids {
			self.destroy(kid, garbage);
		}
		if let Some(detach) = detach {
			detach(self);
		}
	}

	fn reap(&mut self, garbage: &mut Garbage) {
		while !self.touched.is_empty() || !self.orphans.is_empty() {
			for id in std::mem::take(&mut self.touched) {
				self.evict(id, garbage);
			}
			for id in std::mem::take(&mut self.orphans) {
				if self.get(id).is_some_and(|n| n.owner.is_none() && !n.root) {
					self.destroy(id, garbage);
				}
			}
		}
	}
}

thread_local! {
	static RT: RefCell<Runtime> = RefCell::new(Runtime::default());
}

fn rt<R>(task: impl FnOnce(&mut Runtime) -> R) -> R {
	RT.with(|rt| task(&mut rt.borrow_mut()))
}

fn collect(task: impl FnOnce(&mut Runtime, &mut Garbage)) {
	let mut garbage = Garbage::new();
	rt(|rt| task(rt, &mut garbage));
	drop(garbage);
}

fn within<R>(current: Option<Id>, owner: Option<Id>, task: impl FnOnce() -> R) -> R {
	let prev = rt(|rt| {
		let prev = (rt.current, rt.owner);
		rt.current = current;
		rt.owner = owner;
		prev
	});
	let res = task();
	rt(|rt| (rt.current, rt.owner) = prev);
	res
}

pub fn untracked<R>(task: impl FnOnce() -> R) -> R {
	let owner = rt(|rt| rt.owner);
	within(None, owner, task)
}

pub fn solid() {
	rt(|rt| {
		if let Some(host) = rt.host {
			rt.node(host).solid = true;
		}
	})
}

pub fn alive() -> usize {
	rt(|rt| rt.alive())
}

pub fn sync() {
	loop {
		for id in rt(|rt| std::mem::take(&mut rt.queue)) {
			refresh(id);
		}
		collect(|rt, garbage| rt.reap(garbage));
		if rt(|rt| rt.queue.is_empty()) {
			break;
		}
	}
	rt(|rt| rt.scheduled = false);
}

fn refresh(id: Id) {
	let Some((state, busy)) = rt(|rt| rt.get(id).map(|n| (n.state, n.busy))) else { return };
	if busy {
		panic!("$mol_wire: cyclic dependency");
	}
	if state == State::Doubt {
		for dep in rt(|rt| rt.node(id).pubs.clone()) {
			refresh(dep);
			if rt(|rt| rt.get(id).map(|n| n.state)) != Some(State::Doubt) {
				break;
			}
		}
		rt(|rt| {
			if let Some(node) = rt.get_mut(id) {
				if node.state == State::Doubt {
					node.state = State::Fresh;
				}
			}
		});
	}
	let recalc = rt(|rt| rt.get(id).filter(|n| n.state == State::Stale).and_then(|n| n.recalc));
	if let Some(recalc) = recalc {
		recalc(id);
	}
}

pub trait Value: Clone + PartialEq + 'static {
	fn owning(&self) -> Option<Id> {
		None
	}
}

macro_rules! plain_value {
	( $( $type:ty ),* ) => { $( impl Value for $type {} )* };
}

plain_value!(bool, char, i8, i16, i32, i64, i128, isize, u8, u16, u32, u64, u128, usize, f32, f64, String, &'static str, ());

impl<V: Value> Value for Vec<V> {}

impl<V: Value> Value for Rc<V> {}

impl<A: Value, B: Value> Value for (A, B) {}

impl<K: Eq + Hash + Clone + 'static, V: Value> Value for HashMap<K, V> {}

impl<V: Value> Value for Option<V> {
	fn owning(&self) -> Option<Id> {
		self.as_ref().and_then(V::owning)
	}
}

fn calc<T: Value>(id: Id, next: Option<T>) {
	let task = rt(|rt| rt.node(id).task.clone()).expect("$mol_wire: atom without task");
	let task = task.downcast::<Box<dyn Fn(Option<T>) -> T>>().expect("$mol_wire: task type mismatch");
	let put = next.is_some();

	rt(|rt| {
		rt.unlink_pubs(id);
		rt.node(id).busy = true;
	});
	let host = rt(|rt| rt.host.replace(id));
	let value = within(if put { None } else { Some(id) }, None, || task(next));
	rt(|rt| rt.host = host);
	let owning = value.owning();

	collect(|rt, garbage| {
		if let Some(kid) = owning {
			rt.adopt(id, kid);
		}
		rt.release(id, owning.as_slice(), garbage);
		let node = rt.node(id);
		node.busy = false;
		node.state = State::Fresh;
		let changed = node.value.as_ref().and_then(|v| v.downcast_ref::<T>()) != Some(&value);
		if changed {
			garbage.extend(node.value.replace(Box::new(value)));
			for sub in node.subs.clone() {
				rt.mark(sub, State::Stale);
			}
		}
		if !put {
			rt.touch(id);
		}
	});
}

fn read<T: Value>(id: Id) -> T {
	rt(|rt| rt.node(id).value.as_ref().and_then(|v| v.downcast_ref::<T>()).cloned()).expect("$mol_wire: atom without value")
}

fn bind<T: Value>(id: Id, task: impl Fn(Option<T>) -> T + 'static) {
	rt(|rt| {
		let node = rt.node(id);
		if node.task.is_none() {
			let task: Box<dyn Fn(Option<T>) -> T> = Box::new(task);
			node.task = Some(Rc::new(task));
			node.recalc = Some(|id| calc::<T>(id, None));
		}
	});
}

fn pull<T: Value>(id: Id, next: Option<T>) -> T {
	match next {
		Some(next) => calc(id, Some(next)),
		None => {
			rt(|rt| rt.track(id));
			refresh(id);
		}
	}
	read(id)
}

pub struct Mem<T> {
	id: Id,
	_value: PhantomData<fn() -> T>,
}

impl<T> Clone for Mem<T> {
	fn clone(&self) -> Self {
		*self
	}
}

impl<T> Copy for Mem<T> {}

impl<T: Value> Default for Mem<T> {
	fn default() -> Self {
		Self { id: rt(|rt| rt.alloc(Kind::Atom, false)), _value: PhantomData }
	}
}

impl<T: Value> Mem<T> {
	pub fn call(self, next: Option<T>, task: impl Fn(Option<T>) -> T + 'static) -> T {
		bind(self.id, task);
		pull(self.id, next)
	}
}

pub struct MemKey<K, T> {
	id: Id,
	_value: PhantomData<fn() -> (K, T)>,
}

impl<K, T> Clone for MemKey<K, T> {
	fn clone(&self) -> Self {
		*self
	}
}

impl<K, T> Copy for MemKey<K, T> {}

impl<K: Eq + Hash + Clone + 'static, T: Value> Default for MemKey<K, T> {
	fn default() -> Self {
		let id = rt(|rt| {
			let id = rt.alloc(Kind::Map, false);
			rt.node(id).value = Some(Box::new(HashMap::<K, Id>::new()));
			id
		});
		Self { id, _value: PhantomData }
	}
}

impl<K: Eq + Hash + Clone + 'static, T: Value> MemKey<K, T> {
	pub fn call(self, key: &K, next: Option<T>, task: impl Fn(&K, Option<T>) -> T + 'static) -> T {
		let map = self.id;
		let atom = rt(|rt| {
			let found = rt.node(map).value.as_ref().and_then(|v| v.downcast_ref::<HashMap<K, Id>>()).and_then(|m| m.get(key).copied());
			if let Some(atom) = found {
				return atom;
			}
			let owner = std::mem::replace(&mut rt.owner, Some(map));
			let atom = rt.alloc(Kind::Atom, false);
			rt.owner = owner;
			let dict = rt.node(map).value.as_mut().and_then(|v| v.downcast_mut::<HashMap<K, Id>>()).expect("$mol_wire: broken map");
			dict.insert(key.clone(), atom);
			let gone = key.clone();
			rt.node(atom).detach = Some(Box::new(move |rt: &mut Runtime| {
				if let Some(dict) = rt.get_mut(map).and_then(|n| n.value.as_mut()).and_then(|v| v.downcast_mut::<HashMap<K, Id>>()) {
					dict.remove(&gone);
				}
			}));
			atom
		});
		let key = key.clone();
		bind(atom, move |next| task(&key, next));
		pull(atom, next)
	}
}

pub struct Obj<T> {
	id: Id,
	inner: T,
}

impl<T: Copy> Clone for Obj<T> {
	fn clone(&self) -> Self {
		*self
	}
}

impl<T: Copy> Copy for Obj<T> {}

impl<T> PartialEq for Obj<T> {
	fn eq(&self, other: &Self) -> bool {
		self.id == other.id
	}
}

impl<T: Copy + 'static> Value for Obj<T> {
	fn owning(&self) -> Option<Id> {
		Some(self.id)
	}
}

impl<T> Deref for Obj<T> {
	type Target = T;
	fn deref(&self) -> &T {
		if !self.alive() {
			panic!("$mol_wire: access to destroyed object");
		}
		&self.inner
	}
}

impl<T> Obj<T> {
	fn build(root: bool, make: impl FnOnce() -> T) -> Self {
		let id = rt(|rt| rt.alloc(Kind::Obj, root));
		let current = rt(|rt| rt.current);
		let inner = within(current, Some(id), make);
		Self { id, inner }
	}

	pub fn make(make: impl FnOnce() -> T) -> Self {
		Self::build(false, make)
	}

	pub fn alive(&self) -> bool {
		rt(|rt| rt.get(self.id).is_some())
	}
}

impl<T: Default> Default for Obj<T> {
	fn default() -> Self {
		Self::make(T::default)
	}
}

pub struct Root<T> {
	obj: Obj<T>,
}

impl<T: Default> Default for Root<T> {
	fn default() -> Self {
		Self { obj: Obj::build(true, T::default) }
	}
}

impl<T> Deref for Root<T> {
	type Target = Obj<T>;
	fn deref(&self) -> &Obj<T> {
		&self.obj
	}
}

impl<T> Drop for Root<T> {
	fn drop(&mut self) {
		let id = self.obj.id;
		collect(|rt, garbage| rt.destroy(id, garbage));
	}
}

pub struct Auto {
	id: Id,
}

impl Auto {
	pub fn new(task: impl Fn() + 'static) -> Self {
		let id = rt(|rt| rt.alloc(Kind::Auto, true));
		bind::<()>(id, move |_| task());
		rt(|rt| rt.node(id).recalc = Some(|id| calc::<()>(id, None)));
		refresh(id);
		Self { id }
	}
}

impl Drop for Auto {
	fn drop(&mut self) {
		let id = self.id;
		collect(|rt, garbage| rt.destroy(id, garbage));
	}
}
