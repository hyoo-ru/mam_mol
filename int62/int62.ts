namespace $ {
	
	export const $mol_int62_max = ( 2 ** 30 ) - 1
	export const $mol_int62_min = - ( 2 ** 30 )
	export const $mol_int62_range = $mol_int62_max - $mol_int62_min + 1
	
	export function $mol_int62_compare(
		left_hi: number,
		left_lo: number,
		right_hi: number,
		right_lo: number,
	) {
		return ( right_hi - left_hi ) || ( right_lo - left_lo )
	}

	export function $mol_int62_inc(
		hi: number,
		lo: number,
		max = $mol_int62_max,
	) {
		if( lo === max ) {
			return [ hi + 1, -max ] as const
		} else {
			return [ hi, lo + 1 ] as const
		}
	}

	export function $mol_int62_random() {
		return [
			Math.floor( Math.random() * $mol_int62_range + $mol_int62_min ),
			Math.floor( Math.random() * $mol_int62_range + $mol_int62_min ),
		] as const
	}

	export function $mol_int62_hash_string( str: string, seed_hi = 0, seed_lo = 0 ) {
		return $mol_int62_hash_buffer( $mol_charset_encode( str ), seed_hi, seed_lo )
	}
	
	export function $mol_int62_hash_buffer( buf: Uint8Array, seed_hi = 0, seed_lo = 0 ) {
		
		let h1 = 0xdeadbeef ^ seed_hi
		let h2 = 0x41c6ce57 ^ seed_lo
		
		for( const byte of buf ) {
			h1 = Math.imul( h1 ^ byte, 2654435761 )
			h2 = Math.imul( h2 ^ byte, 1597334677 )
		}
		
		h1 = Math.imul( h1 ^ ( h1 >>> 16 ), 2246822507 ) ^ Math.imul( h2 ^ ( h2 >>> 13 ), 3266489909 )
		h2 = Math.imul( h2 ^ ( h2 >>> 16 ), 2246822507 ) ^ Math.imul( h1 ^ ( h1 >>> 13 ), 3266489909 )
		
		return [ h1 << 1 >> 1, h2 << 1 >> 1 ] as const
	}
	
}
