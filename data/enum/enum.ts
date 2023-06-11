namespace $ {

	/**
	 * Checks for value of given enum and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_enum_demo
	 */
	export function $mol_data_enum<
		Dict extends Record< number | string , number | string >
	>( name : string , dict : Dict ) {

		type Value = Dict[ keyof Dict ]

		const index = {} as Record< Value , keyof Dict >

		for( let key in dict ) {
			if( Number.isNaN( Number( key ) ) ) {
				index[ dict[ key ] ] = key
			}
		}

		return $mol_data_setup( ( value : Value ) => {

			if ( typeof index[ value ] !== 'string' ) {
				return $mol_fail( new $mol_data_error( `${value} is not value of ${name} enum` ) )
			}

			return value

		} , { name , dict } )

	}
	
}
