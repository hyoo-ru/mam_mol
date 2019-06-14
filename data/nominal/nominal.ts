namespace $ {

	export function $mol_data_nominal< Nominal extends string >() {
		return < Sub extends $mol_data_value >( sub : Sub )=> {
			return ( val : Parameters<Sub>[0] ) => {
				return sub( val ) as ReturnType<Sub> & { readonly $mol_data_nominal : Nominal }
			}
		}
	}

}
