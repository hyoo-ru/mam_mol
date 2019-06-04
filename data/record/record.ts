namespace $ {

	export function $mol_data_record< Sub extends Record< string , $mol_data_value > >( sub : Sub ) {
		return ( val : { [ key in keyof Sub ] : ReturnType< Sub[key] > } ) => {
			
			for( const field in sub ) {
				val[field] = sub[field]( val[field] )
			}
			
			return val
		}
	}
	
}
