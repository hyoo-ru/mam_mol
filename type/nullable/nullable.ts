namespace $ {

	/**
	 * Null union with properties or with type itself.
	 *
	 * 	// { foo: number | null; bar: string | null }
	 * 	$mol_type_nullable< { foo: number; bar: string } >
	 */
	export type $mol_type_nullable< Type > =
		Type extends object
		? { [ Key in keyof Type ]: Type[ Key ] | null }
		: T | null

}
