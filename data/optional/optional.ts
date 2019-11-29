namespace $ {

	export function $mol_data_optional< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | undefined ) => {
			
			if( val === undefined ) return undefined
			
			return sub( val ) as ReturnType<Sub>
			
		} , sub )

	}
	
}
