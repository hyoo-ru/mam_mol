namespace $ {
	/**
	 * Join string types in camel case
	 *
	 * 	type Camel = $mol_type_case_camel< 'foo', 'bar' > // 'fooBar'
	 */
	export type $mol_type_case_camel<
		Left extends string,
		Right extends string
	> =
		`${ Left }${ Capitalize< Right > }`

}
