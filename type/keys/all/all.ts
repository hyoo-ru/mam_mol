namespace $ {

	/**
	 * All keys from union type
	 *
	 * 	type keys_all = $mol_type_keys_all< { a: number } | { b: string } > // 'a' | 'b'
	 */
	export type $mol_type_keys_all< T > =
		T extends T
		? keyof T
		: never

}
