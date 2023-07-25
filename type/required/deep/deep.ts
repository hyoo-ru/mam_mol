namespace $ {

	/**
	 * Recursive `Required`.
	 *
	 * 	type req = $mol_type_required_deep< { a?: { b?: number } } > // { a: { b: number } }
	 */
	export type $mol_type_required_deep< Type > =
		Type extends object
		?
			Type extends Function
			? Exclude< Type, undefined >
			: { [ Key in keyof Type ]-?: $mol_type_required_deep< Type[ Key ] > }
		: Exclude< Type, undefined >

}
