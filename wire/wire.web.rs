#[link(wasm_import_module = "mol_wire")]
extern "C" {
	fn schedule_sync();
	fn log_text(ptr: *const u8, len: usize);
}

fn schedule() {
	unsafe { schedule_sync() }
}

pub fn log(text: &str) {
	unsafe { log_text(text.as_ptr(), text.len()) }
}

#[no_mangle]
pub extern "C" fn mol_wire_sync() {
	sync()
}

#[no_mangle]
pub extern "C" fn mol_wire_alive() -> u32 {
	alive() as u32
}

#[no_mangle]
pub extern "C" fn mol_wire_alloc(len: usize) -> *mut u8 {
	let mut buf = Vec::<u8>::with_capacity(len);
	let ptr = buf.as_mut_ptr();
	std::mem::forget(buf);
	ptr
}

pub fn text(ptr: *mut u8, len: usize) -> String {
	String::from_utf8_lossy(&unsafe { Vec::from_raw_parts(ptr, len, len) }).into_owned()
}
