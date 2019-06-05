namespace $ {

	export function $mol_data_number( val : number ) {
		if( typeof val === 'number' ) return val
		return $mol_fail( new Error( 'Not a number' ) )
	}
	
}
