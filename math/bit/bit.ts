namespace $ {
	export function $mol_math_bit_pack( a : number , b : number ) {
		return a << 16 | b & 0xFFFF
	}

	export function $mol_math_bit_first( key : number ) {
		return key >> 16
	}

	export function $mol_math_bit_second( key : number ) {
		return ( key & 0xFFFF ) << 16 >> 16
	}
}
