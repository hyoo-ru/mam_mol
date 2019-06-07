namespace $ {

	export function $mol_data_record< Sub extends Record< string , any > >( sub : Sub ) {
		return (( val : { [ key in keyof Sub ] : ReturnType< Sub[key] > } ) => {

			let res = {} as typeof val
			
			for( const field in sub ) {
				res[field] = sub[field]( val[field] )
			}
			
			return res as { readonly [ key in keyof Sub ] : ReturnType< Sub[key] > }
		})

	}
	
}
