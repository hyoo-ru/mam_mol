namespace $ {
	
	// https://webassembly.github.io/spec/core/binary/modules.html#binary-section
	export enum $mol_wasm_bin_section {
		custom ,
		type ,
		import ,
		func ,
		table ,
		memory ,
		global ,
		export ,
		start ,
		element ,
		code ,
		data ,
	}
	
	// https://webassembly.github.io/spec/core/binary/modules.html#binary-importsec
	export enum $mol_wasm_bin_external {
		func,
		table,
		mem,
		global,
	}
	
	// https://webassembly.github.io/spec/core/binary/conventions.html#grammar
	export enum $mol_wasm_bin_valtype {
		i32 = 0x7F,
		i64 = 0x7E,
		f32 = 0x7D,
		f64 = 0x7C,
	}

	// https://webassembly.github.io/spec/core/binary/instructions.html
	export enum $mol_wasm_bin_instr {
		
		// #control-instructions
		'block' = 0x02,
		'loop' = 0x03,
		'if' = 0x04,
		'else' = 0x05,
		'br' = 0x0C,
		'br_if' = 0x0D,
		'br_table' = 0x0E,
		'call' = 0x10,
		'call_indirect' = 0x11,
		
		// #reference-instructions
		'ref.null' = 0xD0,
		'ref.is_null' = 0xD1,
		'ref.func' = 0xD2,
		
		// #parametric-instructions
		'drop' = 0x1A,
		'select' = 0x1B,
		'select2' = 0x1C, // @fixme semantic name
		
		// #memory-instructions
		'memory.size' = 0x3F,
		'memory.grow' = 0x40,
		
		mem = 0xFC, // followed by $mol_wasm_bin_instr_mem
	}

	export enum $mol_wasm_bin_instr_nullary {
		
		// #control-instructions
		'unreachable' = 0x00,
		'nop' = 0x01,
		
		'end' = 0x0B,
		'return' = 0x0F,
		
		// #numeric-instructions
		'i32.eqz' = 0x45,
		'i32.eq' = 0x46,
		'i32.ne' = 0x47,
		'i32.lt_s' = 0x48,
		'i32.lt_u' = 0x49,
		'i32.gt_s' = 0x4A,
		'i32.gt_u' = 0x4B,
		'i32.le_s' = 0x4C,
		'i32.le_u' = 0x4D,
		'i32.ge_s' = 0x4E,
		'i32.ge_u' = 0x4F,
		'i64.eqz' = 0x50,
		'i64.eq' = 0x51,
		'i64.ne' = 0x52,
		'i64.lt_s' = 0x53,
		'i64.lt_u' = 0x54,
		'i64.gt_s' = 0x55,
		'i64.gt_u' = 0x56,
		'i64.le_s' = 0x57,
		'i64.le_u' = 0x58,
		'i64.ge_s' = 0x59,
		'i64.ge_u' = 0x5A,
		'f32.eq' = 0x5B,
		'f32.ne' = 0x5C,
		'f32.lt' = 0x5D,
		'f32.gt' = 0x5E,
		'f32.le' = 0x5F,
		'f32.ge' = 0x60,
		'f64.eq' = 0x61,
		'f64.ne' = 0x62,
		'f64.lt' = 0x63,
		'f64.gt' = 0x64,
		'f64.le' = 0x65,
		'f64.ge' = 0x66,
		'i32.clz' = 0x67,
		'i32.ctz' = 0x68,
		'i32.popcnt' = 0x69,
		'i32.add' = 0x6A,
		'i32.sub' = 0x6B,
		'i32.mul' = 0x6C,
		'i32.div_s' = 0x6D,
		'i32.div_u' = 0x6E,
		'i32.rem_s' = 0x6F,
		'i32.rem_u' = 0x70,
		'i32.and' = 0x71,
		'i32.or' = 0x72,
		'i32.xor' = 0x73,
		'i32.shl' = 0x74,
		'i32.shr_s' = 0x75,
		'i32.shr_u' = 0x76,
		'i32.rotl' = 0x77,
		'i32.rotr' = 0x78,
		'i64.clz' = 0x79,
		'i64.ctz' = 0x7A,
		'i64.popcnt' = 0x7B,
		'i64.add' = 0x7C,
		'i64.sub' = 0x7D,
		'i64.mul' = 0x7E,
		'i64.div_s' = 0x7F,
		'i64.div_u' = 0x80,
		'i64.rem_s' = 0x81,
		'i64.rem_u' = 0x82,
		'i64.and' = 0x83,
		'i64.or' = 0x84,
		'i64.xor' = 0x85,
		'i64.shl' = 0x86,
		'i64.shr_s' = 0x87,
		'i64.shr_u' = 0x88,
		'i64.rotl' = 0x89,
		'i64.rotr' = 0x8A,
		// @fixme other from spec
		
	}
	
	export enum $mol_wasm_bin_instr_unary {
		
		// #variable-instructions
		'local.get' = 0x20,
		'local.set' = 0x21,
		'local.tee' = 0x22,
		'global.get' = 0x23,
		'global.set' = 0x24,
		
		// #table-instructions
		'table.get' = 0x25,
		'table.set' = 0x26,
		
		// #numeric-instructions
		'i32.const' = 0x41,
		'i64.const' = 0x42,
		'f32.const' = 0x43,
		'f64.const' = 0x44,
		
	}
	
	export enum $mol_wasm_bin_instr_binary {
		
		// #memory-instructions
		'i32.load' = 0x28,
		'i64.load' = 0x29,
		'f32.load' = 0x2A,
		'f64.load' = 0x2B,
		'i32.load8_s' = 0x2C,
		'i32.load8_u' = 0x2D,
		'i32.load16_s' = 0x2E,
		'i32.load16_u' = 0x2F,
		'i64.load8_s' = 0x30,
		'i64.load8_u' = 0x31,
		'i64.load16_s' = 0x32,
		'i64.load16_u' = 0x33,
		'i64.load32_s' = 0x34,
		'i64.load32_u' = 0x35,
		'i32.store' = 0x36,
		'i64.store' = 0x37,
		'f32.store' = 0x38,
		'f64.store' = 0x39,
		'i32.store8' = 0x3A,
		'i32.store16' = 0x3B,
		'i64.store8' = 0x3C,
		'i64.store16' = 0x3D,
		'i64.store32' = 0x3E,
		
	}
	
	// https://webassembly.github.io/spec/core/binary/instructions.html
	export enum $mol_wasm_bin_instr_mem {
		
		// #numeric-instructions
		'i32.trunc_sat_f32_s' = 0,
		'i32.trunc_sat_f32_u' = 1,
		'i32.trunc_sat_f64_s' = 2,
		'i32.trunc_sat_f64_u' = 3,
		'i64.trunc_sat_f32_s' = 4,
		'i64.trunc_sat_f32_u' = 5,
		'i64.trunc_sat_f64_s' = 6,
		'i64.trunc_sat_f64_u' = 7,
		
		// #memory-instructions
		'memory.init' = 8,
		'data.drop' = 9,
		'memory.copy' = 10,
		'memory.fill' = 11,
		
		// #table-instructions
		'table.init' = 12,
		'elem.drop' = 13,
		'table.copy' = 14,
		'table.grow' = 15,
		'table.size' = 16,
		'table.fill' = 17,
		
	}

}
