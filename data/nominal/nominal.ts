namespace $ {
	
	type $mol_data_nominal_type< Value, Nominal > = Value | { $mol_data_nominal: Nominal }
	
	type $mol_data_nominal_parser< Input extends any[], Output > = {
		Value : Output
	} & (
		( ... val: Input )=> Output
	)

	/** @deprecated Use $mol_data_tagged instead */
	export function $mol_data_nominal<
		Nominal extends string ,
		Sub extends $mol_data_value ,
		Value = $mol_data_nominal_type<ReturnType< Sub >, Nominal >,
	>(
		config : { [ key in Nominal ] : Sub }
	) : $mol_data_nominal_parser< Parameters<Sub>, Value > {

		const nominal = Object.keys( config )[0] as Nominal
		return config[ nominal ] as any
		
	}

}
