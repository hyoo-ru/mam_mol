namespace $ {
	
	type $mol_data_nominal_type< Value, Tag extends PropertyKey > = Value | { [ Key in Tag ]: Value }
	
	type $mol_data_nominal_parser< Input, Output > = {
		Value: Output
	} & (
		( val: $mol_data_nominal_type< Input, never > )=> Output
	)

	export function $mol_data_nominal<
		Config extends Record< string, $mol_data_value >,
	>(
		config: Config
	) {
		return config as any as {
			[ Type in keyof Config ]: $mol_data_nominal_parser<
				Parameters< Config[ Type ] >[0],
				$mol_data_nominal_type< ReturnType< Config[ Type ] >, Type >
			>
		}
	}

}
