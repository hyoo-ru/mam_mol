namespace $ {
	
	type $mol_data_tagged_type< Value, Tag extends PropertyKey > = Value & { [ Key in Tag ]: Value }
	
	type $mol_data_tagged_parser< Input, Output > = {
		Value: Output
	} & (
		( val: $mol_data_tagged_type< Input, never > )=> Output
	)

	/**
	 * Checks for given runtype and returns tagged version of returned type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_tagged_demo
	 */
	export function $mol_data_tagged<
		Config extends Record< string, $mol_data_value >,
	>(
		config: Config
	) {
		return config as any as {
			[ Type in keyof Config ]: $mol_data_tagged_parser<
				Parameters< Config[ Type ] >[0],
				$mol_data_tagged_type< ReturnType< Config[ Type ] >, Type >
			>
		}
	}

}
