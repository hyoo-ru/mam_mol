namespace $ {
	
	export type $mol_int62_string = `${string}_${string}`
	
	export function $mol_int62_string_ensure( str: unknown ) {
		if( typeof str !== 'string' ) return null
		return $mol_int62_from_string( str ) && str as $mol_int62_string
	}
	
	export type $mol_int62_pair = {
		readonly lo: number,
		readonly hi: number,
	}
	
	export const $mol_int62_max = ( 2 ** 30 ) - 1
	export const $mol_int62_min = - ( 2 ** 30 )
	export const $mol_int62_range = $mol_int62_max - $mol_int62_min + 1
	
	export function $mol_int62_to_string( { lo, hi }: $mol_int62_pair ) {
		lo = ( lo + $mol_int62_range ) % $mol_int62_range
		hi = ( hi + $mol_int62_range ) % $mol_int62_range
		return lo.toString(36) + '_' + hi.toString(36) as $mol_int62_string
	}

	export function $mol_int62_from_string( str: string ): null | $mol_int62_pair {
		
		const [ str_lo, str_hi ] = str.split( '_' )
		
		const int_lo = parseInt( str_lo, 36 )
		const int_hi = parseInt( str_hi, 36 )
		
		if( int_lo.toString( 36 ) !== str_lo || int_hi.toString( 36 ) !== str_hi ) {
			return null
		}
		
		return {
			lo: ( int_lo - $mol_int62_min ) % $mol_int62_range + $mol_int62_min,
			hi: ( int_hi - $mol_int62_min ) % $mol_int62_range + $mol_int62_min,
		} as const
		
	}

	export function $mol_int62_compare(
		left_lo: number,
		left_hi: number,
		right_lo: number,
		right_hi: number,
	) {
		return ( right_hi - left_hi ) || ( right_lo - left_lo )
	}

	export function $mol_int62_inc(
		lo: number,
		hi: number,
		max = $mol_int62_max,
	): $mol_int62_pair {
		if( lo === max ) {
			return { lo: -max, hi: hi + 1 }
		} else {
			return { lo: lo + 1, hi }
		}
	}

	export function $mol_int62_random(): $mol_int62_pair {
		return {
			lo: Math.floor( Math.random() * $mol_int62_range + $mol_int62_min ),
			hi: Math.floor( Math.random() * $mol_int62_range + $mol_int62_min ),
		}
	}

	export function $mol_int62_hash_string( str: string ) {
		return $mol_int62_to_string(
			$mol_int62_hash_buffer(
				$mol_charset_encode( str ),
			)
		)
	}
	
	export function $mol_int62_hash_buffer( buf: Uint8Array, seed = { lo: 0, hi: 0 } ): $mol_int62_pair {
		
		let h1 = 0xdeadbeef ^ seed.lo
		let h2 = 0x41c6ce57 ^ seed.hi
		
		for( const byte of buf ) {
			h1 = Math.imul( h1 ^ byte, 2654435761 )
			h2 = Math.imul( h2 ^ byte, 1597334677 )
		}
		
		h1 = Math.imul( h1 ^ ( h1 >>> 16 ), 2246822507 ) ^ Math.imul( h2 ^ ( h2 >>> 13 ), 3266489909 )
		h2 = Math.imul( h2 ^ ( h2 >>> 16 ), 2246822507 ) ^ Math.imul( h1 ^ ( h1 >>> 13 ), 3266489909 )
		
		return { lo: h1 << 1 >> 1, hi: h2 << 1 >> 1 }
	}
	
}
