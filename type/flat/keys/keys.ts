namespace $ {

	/**
	 * Flat structure key names, leading to non-object types, in tuples. Endpoint specifies structures, whose keys should not be flat.
	 *
	 * 	// [ 'a', 'd' ] | [ 'a', 'b', 'c' ]
	 * 	type keys = $mol_type_flat_keys< { a: { b: { c: number }, d: string } } >
	 */
	export type $mol_type_flat_keys< Type, Endpoint = never > =
		Type extends object
		?
			Type extends Readonly< Array< any > > | Function | Promise< any >
			? []
			:
				Type extends Endpoint
				? []
				:
					{
						[ Key in keyof Type ]-?:
							Key extends string
							?
								[
									Key,
									... $mol_type_flat_keys<
										Required< Type >[ Key ],
										Endpoint
									>
								]
							: never
					}[ keyof Type ]
		: []


	/**
	 * All flat structure key names in tuples. Endpoint specifies structures, whose keys should not be flat.
	 *
	 * 	// [ 'a' ] | [ 'a', 'b' ] | [ 'a', 'd' ] | [ 'a', 'b', 'c' ]
	 * 	type all_keys = $mol_type_flat_keys_all< { a: { b: { c: number }, d: string } } >
	 */
	export type $mol_type_flat_keys_all< Type, Endpoint = never > =
		Type extends object
		?
			Type extends Readonly< Array< any > > | Promise< any >
			? []
			:
				Type extends Endpoint
				? []
				:
					{
						[ Key in keyof Type ]-?:
							Key extends string
							?
								| [ Key ]
								| [
									Key,
									... $mol_type_flat_keys_all<
										Required< Type >[ Key ],
										Endpoint
									>
								 ]
							: never
					}[ keyof Type ]
		: []

}
