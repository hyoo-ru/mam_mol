namespace $ {
	export function $mol_base64_decode_safe( str: string ) {
		return $mol_base64_decode( str.replace( /-/g, '+' ).replace( /_/g, '/' ) )
	}
}
