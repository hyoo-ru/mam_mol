namespace $ {

	/**
	 * Recursive `Required`.
	 *
	 * 	type req = $mol_type_required_deep< { a?: { b?: number } } > // { a: { b: number } }
	 */
	export type $mol_type_required_deep< T > =
		T extends object
		?
			T extends Function
			? Exclude< T, undefined >
			: { [ Key in keyof T ]-?: $mol_type_required_deep< T[ Key ] > }
		: Exclude< T, undefined >

}
