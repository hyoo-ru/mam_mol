namespace $ {

	/**
	 * Get type with folded key names, leading to non-object values and unfolded properties
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: string } } > // 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold< T, Endpoint = never > =
		// @ts-ignore
		$mol_type_partial_undefined2<
			{
				[
					// @ts-ignore
					K in $mol_type_fold_keys< T, Endpoint >
					as $mol_type_case_dot_to_camel< K >
				]:
					$mol_type_unfold_value< T, K >
			}
		>

}
