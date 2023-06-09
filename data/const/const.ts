namespace $ {

	/**
	 * Checks for equality to given value and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_const_demo
	 */
	export function $mol_data_const< Val >( ref : Val ) {

		return $mol_data_setup( ( val : Val ) => {
			
			if( $mol_compare_deep( val , ref ) ) return ref
			
			return $mol_fail( new $mol_data_error( `${ JSON.stringify( val ) } is not ${ JSON.stringify( ref ) }` ) )

		} , ref )

	}
	
}
