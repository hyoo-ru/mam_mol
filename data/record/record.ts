namespace $ {

	/**
	 * Checks for record of given fields with by its runtypes and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_record_demo
	 */
	export function $mol_data_record<
		Sub extends Record< string , $mol_data_value >
	>( sub : Sub ) {

		type Input = $mol_type_partial_undefined<{
			[ key in keyof Sub ] : Parameters< Sub[key] >[0]
		}>

		type Output = $mol_type_partial_undefined<{
			[ key in keyof Sub ] : ReturnType< Sub[key] >
		}>

		return $mol_data_setup( ( val : Input ) => {

			let res = {} as Output
			
			for( const field in sub ) {

				try {
					res[field] = sub[field]( ( val as Input )[ field ] )
				} catch( error: any ) {

					if( error instanceof Promise ) return $mol_fail_hidden( error )
					
					error.message = `[${ JSON.stringify( field ) }] ${ error.message }`
					return $mol_fail( error )

				}

			}
			
			return res as Readonly< Output >
			
		} , sub )

	}
	
}
