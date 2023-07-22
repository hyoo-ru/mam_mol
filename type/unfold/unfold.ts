namespace $ {

	/**
	 * Get property type by folded key name
	 *
	 * 	type abc_type = $mol_type_unfold< { a: { b: { c: number }, d: string }, 'a.b.c' } > // number
	 */
	export type $mol_type_unfold< T, K > =
		K extends keyof T
		? Exclude< T, undefined >[ K ]
		: K extends `${ infer Left }.${ infer Right }`
			? Left extends keyof T
				? $mol_type_unfold< Exclude< T[ Left ], undefined >, Right >
				: never
			: never
}
