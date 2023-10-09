namespace $ {

	/**
	 * Extracts keys from `Input` which values extends `Upper` and extendable by `Lower`.
	 *
	 * 	type MathConstants = $mol_type_keys_extract< Math , number > // "E" | "PI" ...
	 */
	export type $mol_type_keys_extract< Input , Upper , Lower = never > =
		{
			[ Field in keyof Input ]:

				unknown extends Input[ Field ]
				? never

				: Input[ Field ] extends never
				? never

				: Input[ Field ] extends Upper
				?
					[ Lower ] extends [ Input[ Field ] ]
						? Field
						: never
				: never

		}[ keyof Input ]

}
