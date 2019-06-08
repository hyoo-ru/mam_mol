namespace $ {

	export function $mol_data_optional< Sub extends $mol_data_value >( sub : Sub ) {
		return ( val : ReturnType<Sub> | undefined ) => {
			
			if( val === undefined ) return val
			
			return sub( val ) as ReturnType<Sub>
		}
	}
					
}
