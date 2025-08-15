namespace $ {

	/** [LEB128](https://wikipedia.org/wiki/LEB128) implementation. */
	export function $mol_leb128_encode( val : number ) : Uint8Array< ArrayBuffer > {
		
		const length = Math.max( 1 , Math.ceil( Math.log2( val ) / 7 ) )
		const bytes = new Uint8Array( length )
		
		for( let i = 0 ; i < bytes.length ; ++ i ) {
			bytes[ i ] = ( ( val >> ( 7 * i ) ) & 0xFF ) | ( 1 << 7 )
		}

		bytes[ bytes.length - 1 ] ^= ( 1 << 7 )

		return bytes
	}

	/** [LEB128](https://wikipedia.org/wiki/LEB128) implementation. */
	export function $mol_leb128_decode( bytes : Uint8Array< ArrayBuffer > ) : number {

		let val = 0

		for( let i = 0 ; i < bytes.length ; ++ i ) {
			val |= ( bytes[ i ] & ~( 1 << 7 ) ) << ( 7 * i )
		}

		return val
	}

}
