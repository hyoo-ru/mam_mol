use std::cell::RefCell;
use std::collections::HashMap;

thread_local! {
	static HITS: RefCell<HashMap<&'static str, u32>> = RefCell::new(HashMap::new());
}

fn hit(name: &'static str) {
	HITS.with(|h| *h.borrow_mut().entry(name).or_default() += 1)
}

fn hits(name: &'static str) -> u32 {
	HITS.with(|h| h.borrow().get(name).copied().unwrap_or(0))
}

#[derive(Clone, Copy, Default)]
struct Item {
	title: Mem<String>,
}

impl Item {
	fn title(self, next: Option<String>) -> String {
		self.title.call(next, |next| next.unwrap_or_default())
	}
}

#[derive(Clone, Copy, Default)]
struct Counter {
	count: Mem<i32>,
	parity: Mem<bool>,
	double: Mem<i32>,
	label: Mem<String>,
	diamond: Mem<i32>,
	title: MemKey<u32, String>,
	current: Mem<Obj<Item>>,
	stored: Mem<Option<Obj<Item>>>,
	kept: Mem<Option<Obj<Item>>>,
	bag: Mem<Vec<Obj<Item>>>,
	item: MemKey<u32, Obj<Item>>,
	ping: Mem<i32>,
	pong: Mem<i32>,
}

impl Counter {
	fn count(self, next: Option<i32>) -> i32 {
		self.count.call(next, |next| next.unwrap_or(1))
	}

	fn parity(self) -> bool {
		self.parity.call(None, move |_| self.count(None) % 2 == 0)
	}

	fn double(self) -> i32 {
		self.double.call(None, move |_| {
			hit("double");
			self.count(None) * 2
		})
	}

	fn label(self) -> String {
		self.label.call(None, move |_| {
			hit("label");
			if self.parity() { "even".into() } else { "odd".into() }
		})
	}

	fn diamond(self) -> i32 {
		self.diamond.call(None, move |_| {
			hit("diamond");
			self.double() + self.count(None)
		})
	}

	fn title(self, id: u32, next: Option<String>) -> String {
		self.title.call(&id, next, move |id, next| next.unwrap_or_else(|| format!("#{} of {}", id, self.count(None))))
	}

	fn current(self) -> Obj<Item> {
		self.current.call(None, move |_| {
			let item = Obj::<Item>::default();
			item.title(Some(format!("item {}", self.count(None))));
			item
		})
	}

	fn stored(self, next: Option<Option<Obj<Item>>>) -> Option<Obj<Item>> {
		self.stored.call(next, |next| next.flatten())
	}

	fn kept(self, next: Option<Option<Obj<Item>>>) -> Option<Obj<Item>> {
		self.kept.call(next, |next| next.flatten())
	}

	fn bag(self, next: Option<Vec<Obj<Item>>>) -> Vec<Obj<Item>> {
		self.bag.call(next, |next| next.unwrap_or_default())
	}

	fn item(self, id: u32) -> Obj<Item> {
		self.item.call(&id, None, |id, _| {
			let item = Obj::<Item>::default();
			item.title(Some(format!("item {}", id)));
			item
		})
	}

	fn ping(self) -> i32 {
		self.ping.call(None, move |_| self.pong())
	}

	fn pong(self) -> i32 {
		self.pong.call(None, move |_| self.ping())
	}
}

#[test]
fn memoized() {
	let app = Root::<Counter>::default();
	assert_eq!(app.double(), 2);
	assert_eq!(app.double(), 2);
	assert_eq!(hits("double"), 1);
}

#[test]
fn invalidated_by_put() {
	let app = Root::<Counter>::default();
	assert_eq!(app.double(), 2);
	app.count(Some(5));
	assert_eq!(app.double(), 10);
	assert_eq!(hits("double"), 2);
}

#[test]
fn equal_value_stops_propagation() {
	let app = Root::<Counter>::default();
	assert_eq!(app.label(), "odd");
	app.count(Some(3));
	assert_eq!(app.label(), "odd");
	assert_eq!(hits("label"), 1);
	app.count(Some(4));
	assert_eq!(app.label(), "even");
	assert_eq!(hits("label"), 2);
}

#[test]
fn diamond_once() {
	let app = Root::<Counter>::default();
	assert_eq!(app.diamond(), 3);
	app.count(Some(10));
	assert_eq!(app.diamond(), 30);
	assert_eq!(hits("diamond"), 2);
}

#[test]
fn keyed_mem() {
	let app = Root::<Counter>::default();
	assert_eq!(app.title(7, None), "#7 of 1");
	app.count(Some(2));
	assert_eq!(app.title(7, None), "#7 of 2");
	app.title(7, Some("custom".into()));
	assert_eq!(app.title(7, None), "custom");
	assert_eq!(app.title(8, None), "#8 of 2");
}

#[test]
fn auto_reruns_on_sync() {
	let app = Root::<Counter>::default();
	let seen = Rc::new(RefCell::new(Vec::new()));
	let auto = Auto::new({
		let app = *app;
		let seen = seen.clone();
		move || seen.borrow_mut().push(app.label())
	});
	app.count(Some(3));
	sync();
	app.count(Some(6));
	sync();
	assert_eq!(*seen.borrow(), vec!["odd", "even"]);
	drop(auto);
	app.count(Some(7));
	sync();
	assert_eq!(seen.borrow().len(), 2);
}

#[test]
fn root_drop_frees_everything() {
	{
		let app = Root::<Counter>::default();
		app.count(Some(3));
		app.diamond();
		app.title(1, None);
		app.current();
		app.stored(Some(Some(Obj::default())));
		sync();
	}
	assert_eq!(alive(), 0);
}

#[test]
fn unobserved_caches_evicted_on_sync() {
	let app = Root::<Counter>::default();
	sync();
	let base = alive();
	for id in 0..100 {
		app.title(id, None);
	}
	assert_eq!(alive(), base + 100);
	sync();
	assert_eq!(alive(), base);
}

#[test]
fn observed_caches_survive_sync() {
	let app = Root::<Counter>::default();
	let auto = Auto::new({
		let app = *app;
		move || {
			app.title(1, None);
		}
	});
	sync();
	let base = alive();
	sync();
	assert_eq!(alive(), base);
	assert_eq!(app.title(1, None), "#1 of 1");
	drop(auto);
	sync();
	assert_eq!(alive(), base - 1 - 1);
}

#[test]
fn derived_object_replaced_without_leak() {
	let app = Root::<Counter>::default();
	let auto = Auto::new({
		let app = *app;
		move || {
			app.current();
		}
	});
	sync();
	let base = alive();
	for count in 0..10 {
		app.count(Some(count));
		sync();
	}
	assert_eq!(alive(), base);
	let old = app.current();
	app.count(Some(100));
	sync();
	assert!(!old.alive());
	assert_eq!(app.current().title(None), "item 100");
	drop(auto);
	sync();
	assert_eq!(alive(), base - 1 - 2);
}

#[test]
fn keyed_object_lives_while_observed() {
	let app = Root::<Counter>::default();
	sync();
	let base = alive();
	let auto = Auto::new({
		let app = *app;
		move || {
			app.item(1).title(None);
		}
	});
	sync();
	let item = app.item(1);
	sync();
	assert!(item.alive());
	assert!(item == app.item(1));
	drop(auto);
	sync();
	assert!(!item.alive());
	assert_eq!(alive(), base);
}

#[test]
fn collection_owns_nothing() {
	let app = Root::<Counter>::default();
	sync();
	let base = alive();
	let first = Obj::<Item>::default();
	let second = Obj::<Item>::default();
	app.bag(Some(vec![first, second]));
	sync();
	assert!(!first.alive());
	assert!(!second.alive());
	assert_eq!(app.bag(None).len(), 2);
	assert_eq!(alive(), base);
}

#[test]
fn orphans_freed_on_sync() {
	let _app = Root::<Counter>::default();
	sync();
	let base = alive();
	let orphan = Obj::<Item>::default();
	orphan.title(Some("lost".into()));
	assert_eq!(alive(), base + 2);
	sync();
	assert_eq!(alive(), base);
	assert!(!orphan.alive());
}

#[test]
fn put_catches_and_releases() {
	let app = Root::<Counter>::default();
	sync();
	let base = alive();
	let first = Obj::<Item>::default();
	let second = Obj::<Item>::default();
	app.stored(Some(Some(first)));
	sync();
	assert!(first.alive());
	assert!(!second.alive());
	assert_eq!(alive(), base + 2);
	let third = Obj::<Item>::default();
	app.stored(Some(Some(third)));
	assert!(!first.alive());
	assert!(third.alive());
	assert_eq!(alive(), base + 2);
}

#[test]
#[should_panic(expected = "destroyed")]
fn ownership_never_moves() {
	let app = Root::<Counter>::default();
	let item = Obj::<Item>::default();
	app.stored(Some(Some(item)));
	app.kept(Some(Some(item)));
	app.stored(Some(None));
	app.kept(None).unwrap().title(None);
}

#[test]
#[should_panic(expected = "cyclic")]
fn cycle_panics() {
	let app = Root::<Counter>::default();
	app.ping();
}
