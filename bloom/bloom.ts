namespace $ {
	
	/**
	 * Bloom filter with automatic optimal parameters.
	 * False negative is impossible.
	 * False positive is controlled.
	 */
	export class $mol_bloom extends Object {
		
		bitmap: Uint32Array
		hashes: number
		
		constructor(
			/** Max count of stored values. */
			count: number,
			/** Chance of false positive. 1e-6 by default */
			public risk = 1e-6,
		) {
			super()
			this.hashes = Math.ceil( -1.44 * Math.log( risk ) )
			
			const length = Math.ceil( -.065 * count * Math.log( risk ) )
			this.bitmap = new Uint32Array( 2 ** Math.ceil( Math.log2( length ) ) )
		}
		
		add_str( word: string ) {
			this.add_bin( $mol_charset_encode( word ) )
		}
		
		has_str( word: string ) {
			return this.has_bin( $mol_charset_encode( word ) )
		}
		
		add_bin( bin: Uint8Array< ArrayBuffer > ) {
			for( const index of this.hash( bin ) ) {
				this.add_bit( index )
			}
		}
		
		has_bin( bin: Uint8Array< ArrayBuffer > ) {
			let res = 1
			for( const index of this.hash( bin ) ) {
				res &= this.has_bit( index )
			}
			return res
		}
		
		hash( data: Uint8Array< ArrayBuffer > ) {
			const res = [] as number[]
			fill: while( true ) {
				data = $mol_crypto_hash( data )
				for( const index of new Uint32Array( data.buffer ) ) {
					res.push( index )
					if( res.length >= this.hashes ) break fill
				}
			}
			return res
		}
		
		add_bit( index: number ) {
			const int = Math.ceil( index / 32 ) % this.bitmap.length
			const bit = index & 0b11111
			this.bitmap[ int ] |= 1 << bit
		}
		
		has_bit( index: number ) {
			const int = Math.ceil( index / 32 ) % this.bitmap.length
			const bit = index & 0b11111
			return 1&( this.bitmap[ int ] >> bit )
		}
		
	}
	
}
