namespace $ {

	export function $mol_data_record<
		Sub extends Record< string , $mol_data_value< any > >
	>( sub : Sub ) {

		type Input = $mol_type_partial_undefined<{
			[ key in keyof Sub ] : Parameters< Sub[key] >[0]
		}>

		type Output = $mol_type_partial_undefined<{
			[ key in keyof Sub ] : ReturnType< Sub[key] >
		}>

		return $mol_data_setup( ( val : Input | unknown ) => {

			let res = {} as Output
			
			for( const field in sub ) {

				try {
					res[field] = sub[field]( ( val as Input )[ field ] )
				} catch( error ) {

					if( 'then' in error ) return $mol_fail_hidden( error )
					
					error.message = `[${ JSON.stringify( field ) }] ${ error.message }`
					return $mol_fail( error )

				}

			}
			
			return res as Readonly< Output >
			
		} , sub )

	}
	
}
