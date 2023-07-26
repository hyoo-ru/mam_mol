namespace $ {

	/**
	 * Capitalize type keys.
	 *
	 * 	// { Foo: 1; Bar: 2 }
	 * 	$mol_type_case_capital_keys< { foo: 1; bar: 2 } >
	 */
	export type $mol_type_case_capital_keys< Type > =
		{
			[
				Key in keyof Type
				as Capitalize< Extract< Key, string > >
			]:
				Type[ Key ]
		}

	/**
	 * Capitalize type values.
	 *
	 * 	// { foo: 'Bar' }
	 * 	$mol_type_case_capital_values< { foo: 'bar' } >
	 */
	export type $mol_type_case_capital_values< Type > =
		{
			[ Key in keyof Type ]:
				Capitalize< Extract< Type[ Key ], string > >
		}

}
