namespace $ {

	/**
	 * Checks for integer and returns number type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_integer_demo
	 */
	export function $mol_data_integer( val : number ) {

		const val2 = $mol_data_number( val )
		if( Math.floor( val2 ) === val2 ) return val2
		
		return $mol_fail( new $mol_data_error( `${ val } is not an integer` ) )
	}
	
}
