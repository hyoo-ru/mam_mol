namespace $ {

	export function $mol_data_array< Sub extends $mol_data_value >( sub : Sub ) {
		return ( val : readonly ReturnType< Sub >[] ) => {
			return val.map( sub ) as readonly ReturnType< Sub >[]
		}
	}
			
}
