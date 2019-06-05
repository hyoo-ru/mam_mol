namespace $ {

	export function $mol_data_email( val : string ) {
		val = $mol_data_string( val )
		if( /.+@.+/.test( val ) ) return val
		return $mol_fail( new Error( 'Not an e-mail' ) )
	}
	
}
