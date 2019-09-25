namespace $ {
	export function $mol_coord_pack( a : number , b : number ) {
		return a << 16 | b & 0xFFFF
	}

	export function $mol_coord_high( key : number ) {
		return key >> 16
	}

	export function $mol_coord_low( key : number ) {
		return ( key & 0xFFFF ) << 16 >> 16
	}
}
