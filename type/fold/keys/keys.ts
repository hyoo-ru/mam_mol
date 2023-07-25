namespace $ {

	type join_keys< Key1, Key2 > =
		Key1 extends string
		?
			Key2 extends string
			? $mol_type_case_dot< Key1, Key2 >
			: never
		: never

	/**
	 * Folded nested structure key names, leading to non-object types. Endpoint specifies structures, whose keys should not be folded.
	 *
	 * 	type keys = $mol_type_fold_keys< { a: { b: { c: number }, d: string } } > // 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys< Type, Endpoint = never > =
		Type extends object
		?
			Type extends Readonly< Array< any > > | Function | Promise< any >
			? ''
			:
				Type extends Endpoint
				? ''
				:
					{
						[ Key in keyof Type ]-?:
							Key extends string
							?
								join_keys<
									Key,
									$mol_type_fold_keys<
										Required< Type >[ Key ],
										Endpoint
									>
								>
							: never
					}[ keyof Type ]
		: ''


	/**
	 * Folded all nested structure key names. Endpoint specifies structures, whose keys should not be folded.
	 *
	 * 	type all_keys = $mol_type_fold_keys_all< { a: { b: { c: number }, d: string } } > // 'a' | 'a.b' | 'a.d' | 'a.b.c'
	 */
	export type $mol_type_fold_keys_all< Type, Endpoint = never > =
		Type extends object
		?
			Type extends Readonly< Array< any > > | Promise< any >
			? ''
			:
				Type extends Endpoint
				? ''
				:
					{
						[ Key in keyof Type ]-?:
							Key extends string
							?
								| Key
								| join_keys<
									Key,
									$mol_type_fold_keys_all<
										Required< Type >[ Key ],
										Endpoint
									>
								 >
							: never
					}[ keyof Type ]
		: ''

}
