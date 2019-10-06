namespace $ {

	export function $mol_data_boolean( val : boolean ) {
		
		if( typeof val === 'boolean' ) return val
		
		return $mol_fail( new Error( 'is not a boolean' ) )
	}
	
}
