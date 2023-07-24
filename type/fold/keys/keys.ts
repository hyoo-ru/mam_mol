namespace $ {

	type join_keys< K1, K2 > =
		K1 extends string
		?
			K2 extends string
			? $mol_type_case_dot< K1, K2 >
			: never
		: never

	/**
	 * Folded nested structure key names, leading to non-object types. Endpoint specifies structures, whose keys should not be folded.
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: string } } > // 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys< T, Endpoint = never > =
		T extends object
		?
			T extends Array< any > | Function | Promise< any >
			? ''
			:
				T extends Endpoint
				? ''
				:
					{
						[ Key in keyof T ]-?:
							Key extends string
							?
								join_keys<
									Key,
									$mol_type_fold_keys<
										Required< T >[ Key ],
										Endpoint
									>
								>
							: never
					}[ keyof T ]
		: ''


	/**
	 * Folded all nested structure key names. Endpoint specifies structures, whose keys should not be folded.
	 *
	 * 	type all_keys = $mol_type_fold_keys_all< { a: { b: { c: number }, d: string } } > // 'a' | 'a.b' | 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys_all< T, Endpoint = never > =
		T extends object
		?
			T extends Array< any > | Promise< any >
			? ''
			:
				T extends Endpoint
				? ''
				:
					{
						[ Key in keyof T ]-?:
							Key extends string
							?
								| Key
								| join_keys<
									Key,
									$mol_type_fold_keys_all<
										Required< T >[ Key ],
										Endpoint
									>
								 >
							: never
					}[ keyof T ]
		: ''

}
