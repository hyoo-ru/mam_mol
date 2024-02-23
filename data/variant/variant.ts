namespace $ {

	/**
	 * Checks for some of given runtype or throws error.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_variant_demo
	 */
	export function $mol_data_variant< Sub extends $mol_data_value[] >( ... sub : Sub ) {

		return $mol_data_setup( ( val : Parameters< Sub[ number ] >[0] ) => {
			
			const errors = [] as Error[]
			
			for( const type of sub ) {

				let hidden = $.$mol_fail_hidden

				try {

					$.$mol_fail = $.$mol_fail_hidden

					return type( val ) as ReturnType< Sub[ number ] >

				} catch ( error ) {

					$.$mol_fail = hidden

					if( error instanceof $mol_data_error ) {
						errors.push( error )
					} else {
						return $mol_fail_hidden( error )
					}

				}

			}
			
			return $mol_fail( new $mol_data_error( `${val} is not any of variants` , null, ... errors ) )

		} , sub )

	}
	
}
