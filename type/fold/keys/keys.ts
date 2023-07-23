namespace $ {

	/**
	 * Folded nested structure key names
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: string } } > // 'a' | 'a.b' | 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys< T > =
		T extends object
		?
			T extends Array< any >
			? ''
			:
				T extends Promise< any >
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

	/**
	 * Pick folded nested structure key names by property type
	 *
	 * 	type string_keys = $mol_type_fold_keys_pick< { a: { b: { c: number }, d: string } }, string > // 'a.d'
	 */
	export type $mol_type_fold_keys_pick< T, Pick > =
		{
			[ K in $mol_type_fold_keys< T > ]:
				$mol_type_unfold< T, K > extends Pick
				? K
				: never
		}[ $mol_type_fold_keys< T > ]

	/**
	 * Omit folded nested structure key names by property type
	 *
	 * 	type not_string_keys = $mol_type_fold_keys_omit< { a: { b: { c: number }, d: string } }, string > // 'a' | 'a.b' | 'a.b.c'
	 */
	export type $mol_type_fold_keys_omit< T, Omit > =
		{
			[ K in $mol_type_fold_keys< T > ]:
				$mol_type_unfold< T, K > extends Omit
				? never
				: K
		}[ $mol_type_fold_keys< T > ]

}
