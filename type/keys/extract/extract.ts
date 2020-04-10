namespace $ {

	/**
	 * Extracts keys from `Input` which values extends `Upper`.
	 * 
	 * 	type MathConstants = $mol_type_keys_extract< Math , number > // "E" | "PI" ...
	 */
	export type $mol_type_keys_extract< Input , Upper > =
		{
			[ Field in keyof Input ]
				
				: unknown extends Input[ Field ]
				? never
				
				: Input[ Field ] extends never
				? never
				
				: Input[ Field ] extends Upper
				? Field
				
				: never

		}[ keyof Input ]

}
