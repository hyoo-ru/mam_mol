namespace $ {

	/**
	 * 48-bit streamable array hash function
	 * Based on cyrb53: https://stackoverflow.com/a/52171480
	 */
	export function $mol_hash_numbers( buff: ArrayLike< number >, seed = 0 ) {
		
		let h1 = 0xdeadbeef ^ seed
		let h2 = 0x41c6ce57 ^ seed
		
		for( let i = 0; i < buff.length; ++i ) {
			const item = buff[i]
			h1 = Math.imul( h1 ^ item, 2654435761 )
			h2 = Math.imul( h2 ^ item, 1597334677 )
		}
		
		h1 = Math.imul( h1 ^ ( h1 >>> 16 ), 2246822507 ) ^ Math.imul( h2 ^ ( h2 >>> 13 ), 3266489909 )
		h2 = Math.imul( h2 ^ ( h2 >>> 16 ), 2246822507 ) ^ Math.imul( h1 ^ ( h1 >>> 13 ), 3266489909 )
		
		return 4294967296 * ( ( ( 1 << 16 ) - 1 ) & h2 ) + ( h1 >>> 0 )
	}

}
