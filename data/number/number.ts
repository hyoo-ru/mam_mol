namespace $ {

	/**
	 * Checks for number and returns number type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_number_demo
	 */
	export let $mol_data_number = ( val : number )=> {
		
		if( typeof val === 'number' ) return val
		
		return $mol_fail( new $mol_data_error( `${ val } is not a number` ) )
		
	}
	
}
