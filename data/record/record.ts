namespace $ {

	export function $mol_data_record< Sub extends Record< string , $mol_data_value< any > > >( sub : Sub ) {

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
					res[field] = sub[field]( val[field] )
				} catch( error ) {
					return $mol_fail_hidden( new Error( `[${ JSON.stringify( field ) }] ${ error.message || error }` ) )
				}

			}
			
			return res as Readonly< Output >
			
		} , sub )

	}
	
}
