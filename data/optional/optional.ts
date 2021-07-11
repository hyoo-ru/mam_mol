namespace $ {

	export function $mol_data_optional<
		Sub extends $mol_data_value,
		Fallback extends ReturnType< Sub > | undefined
	>( 
		sub: Sub,
		fallback?: ()=> Fallback
	) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | undefined ) => {
			
			if( val === undefined ) return fallback?.() ?? undefined
			
			return sub( val ) as ReturnType<Sub>
			
		} , { sub, fallback } )

	}
	
}
