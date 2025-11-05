namespace $ {

	/**
	 * Checks for dictionary which maps strings to given runtype and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_dict_demo
	 */
	export function $mol_data_dict< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( val : Readonly< Record< string , ReturnType< Sub > > > ) => {
			
			if( Object.getPrototypeOf( val ) !== Object.prototype ) {
				return $mol_fail( new $mol_data_error( `${ val } is not an Object` ) )
			}

			const res = {} as Record< string , ReturnType< Sub > >
			
			for( const field in val as Object ) {

				try {
					res[ field ] = sub( ( val as any )[ field ] )
				} catch( error: any ) {

					if( $mol_promise_like(error) ) return $mol_fail_hidden( error )

					const parent = typeof (error as Error).cause === 'object' && Array.isArray(error.cause?.path)
						? error.cause.path as (string | number)[]
						: []

					const path = [field, ... parent ]

					error = new $mol_data_error('Dictionary field invalid', { path }, error)

					return $mol_fail( error )

				}

			}
			
			return res as Readonly< Record< string , ReturnType< Sub > > >
			
		} , sub )

	}
			
}
