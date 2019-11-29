namespace $ {

	export function $mol_data_nominal<
		Nominal extends string ,
		Sub extends $mol_data_value ,
		Value = ReturnType< Sub > & { $mol_data_nominal : Nominal } ,
	>(
		config : { [ key in Nominal ] : Sub }
	) : {
		Value : Value
	} & (
		( ... val : Parameters<Sub> )=> Value
	) {

		const nominal = Object.keys( config )[0] as Nominal
		return config[ nominal ] as any
		
	}

}
