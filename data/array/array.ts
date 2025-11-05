namespace $ {

	/**
	 * Checks for array of given runtype and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_array_demo
	 */
	export function $mol_data_array< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( val : readonly Parameters< Sub >[0][] ) => {
			
			if( !Array.isArray( val ) ) return $mol_fail( new $mol_data_error( `${ val } is not an array` ) )
			
			return val.map( ( item , index )=> {

				try {
					return sub( item )
				} catch( error: any ) {

					if( $mol_promise_like(error) ) return $mol_fail_hidden( error )
					error = new $mol_error_mix('Array item invalid', { index }, error)

					return $mol_fail( error )

				}

			} ) as readonly ReturnType< Sub >[]
			
		} , sub )

	}
			
}
