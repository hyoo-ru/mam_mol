namespace $ {

	/**
	 * Extracts only keys from `Input` that fits to `Constraint`. `any` and `unknown` values are ignored.
	 * 
	 * 	type MathConstants = $mol_type_filter_keys< Math , number > // "E" | "PI" ...
	 */
	export type $mol_type_filter_keys< Input , Constraint >
		= {
			[ Field in keyof Input ] : Input[ Field ] extends Constraint
				? unknown extends Input[ Field ]
					? never
					: Field
				: never
		}[ keyof Input ]

	/**
	 * Picks only keys from `Input` that value fits to `Constraint`. `any` and `unknown` values are ignored.
	 * 
	 * 	type MathConstants = $mol_type_filter< Math , number > // { E , PI , ... }
	 */
	export type $mol_type_filter< Input , Constraint >
		= Pick<
			Input ,
			$mol_type_filter_keys< Input , Constraint >
		>

}
