namespace $ {

	export function $mol_data_record< Sub extends Record< string , any > >( sub : Sub ) {
		return (( val : { [ key in keyof Sub ] : Parameters< Sub[key] >[0] } ) => {

			let res = {} as { [ key in keyof Sub ] : ReturnType< Sub[key] > }
			
			for( const field in sub ) {

				try {
					res[field] = sub[field]( val[field] )
				} catch( error ) {
					return $mol_fail_hidden( new Error( `[${ JSON.stringify( field ) }] ${ error.message || error }` ) )
				}

			}
			
			return res as { readonly [ key in keyof Sub ] : ReturnType< Sub[key] > }
		})

	}
	
}
