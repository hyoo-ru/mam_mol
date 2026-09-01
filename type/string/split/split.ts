namespace $ {

	/**
	 * Split string into parts with separator.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_string_split< 'foo-bar-wee', '-' >
	 */
	export type $mol_type_string_split<
		String extends string,
		Separator extends string = ''
	> =
		'' extends String
		? []
		:
			String extends `${ infer Left }${ Separator }${ infer Right }`
			?
				[
					... ( '' extends Left ? [] : [ Left ] ),
					... $mol_type_string_split< Right, Separator >
				]
			: [ String ]

}
