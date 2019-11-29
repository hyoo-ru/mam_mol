namespace $ {

	export function $mol_data_nullable< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | null ) => {
			
			if( val === null ) return null
			
			return sub( val ) as ReturnType<Sub>
			
		} , sub )

	}
	
}
