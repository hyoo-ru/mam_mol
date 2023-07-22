namespace $ {

	/**
	 * Join string types by dot symbol
	 *
	 * 	type Dot = $mol_type_case_dot< 'foo', 'bar' > // 'foo.bar'
	 */
	export type $mol_type_case_dot<
		Left extends string,
		Right extends string
	> =
		`${ Left }${ '' extends Right ? '' : '.' }${ Right }`

}
