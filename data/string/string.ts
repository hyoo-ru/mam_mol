namespace $ {

	export function $mol_data_string( val : string ) {
		if( typeof val === 'string' ) return val
		return $mol_fail( new Error( 'Not a string' ) )
	}
	
}
