namespace $ {

	/**
	 * Folded nested structure key names
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: number } } > // 'a' | 'a.b' | 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys< T > =
		T extends object
		?
			T extends Function
			? ''
			:
				T extends Array< any >
				? ''
				:
					{
						[ Key in keyof T ]-?:
							Key extends string
							?
								| Key
								| $mol_type_case_dot<
									Key,
									$mol_type_fold_keys<
										Required< T >[ Key ]
									>
								 >
							: never
					}[ keyof T ]
		: ''

}
