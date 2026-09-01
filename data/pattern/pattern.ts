namespace $ {

	/**
	 * Checks for matching to given regular expression.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_pattern_demo
	 */
	export function $mol_data_pattern( pattern : RegExp ) {

		return $mol_data_setup( ( val : string ) => {

			const val2 = $mol_data_string( val )
			if( pattern.test( val2 ) ) return val2
			
			return $mol_fail( new $mol_data_error( `${ val } is not a ${ pattern }` ) )

		} , pattern )

	}
					
}
