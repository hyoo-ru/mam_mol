namespace $ {

	export function $mol_data_email( val : string ) {
		val = $mol_data_string( val )
		if( /.+@.+/.test( val ) ) return val
		throw new Error( 'Not an e-mail' )
	}
	
}
