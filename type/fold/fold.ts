namespace $ {

	/**
	 * Get type with folded key names, leading to non-object values and unfolded properties
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: string } } > // 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold< Type, Endpoint = never > =
		// @ts-ignore
		$mol_type_partial_undefined2<
			{
				[
					// @ts-ignore
					FoldedKey in $mol_type_fold_keys< Type, Endpoint >
					as $mol_type_case_dot_to_camel< FoldedKey >
				]:
					$mol_type_unfold_value< Type, FoldedKey >
			}
		>

}
