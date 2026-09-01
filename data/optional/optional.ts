namespace $ {

	/**
	 * Checks for undefined or passing given runtype.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_optional_demo
	 */
	export function $mol_data_optional<
		Sub extends $mol_data_value,
		Fallback extends undefined | ( ()=> ReturnType< Sub > )
	>( 
		sub: Sub,
		fallback?: Fallback
	) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | undefined ) => {
			
			if( val === undefined ) {
				type Res = Fallback extends undefined ? undefined : ReturnType< Extract< Fallback, ()=> any > >
				return fallback?.() as Res
			}
			
			return sub( val ) as ReturnType<Sub>
			
		} , { sub, fallback } )

	}
	
}
