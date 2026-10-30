use std::collections::VecDeque;

thread_local! {
	static TASKS: RefCell<VecDeque<Box<dyn FnOnce()>>> = RefCell::new(VecDeque::new());
}

fn schedule() {}

pub fn after(task: impl FnOnce() + 'static) {
	TASKS.with(|tasks| tasks.borrow_mut().push_back(Box::new(task)))
}

pub fn run(main: impl FnOnce()) {
	let mut next: Option<Box<dyn FnOnce()>> = Some(Box::new(main));
	while let Some(task) = next {
		task();
		if rt(|rt| rt.scheduled) {
			sync();
		}
		next = TASKS.with(|tasks| tasks.borrow_mut().pop_front());
	}
}

pub fn log(text: &str) {
	println!("{}", text)
}
