namespace $ {

	export function $mol_data_nominal<
		Nominal extends string ,
		Sub extends $mol_data_value ,
	>( config : { [ key in Nominal ] : Sub } ) {

		const nominal = Object.keys( config )[0] as Nominal
		const sub = config[ nominal ] as Sub

		return ( val : Parameters<Sub>[0] ) => {
			return sub( val ) as ReturnType<Sub> & { $mol_data_nominal : Nominal }
		}
		
	}

}
