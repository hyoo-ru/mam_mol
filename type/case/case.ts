namespace $ {

	/**
	 * Join strings in snake_case.
	 *
	 * 	// 'foo_bar_wee'
	 * 	$mol_type_case_snake< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_snake< Parts extends Array< string > > =
		$mol_type_string_join< Parts, '_' >

	/**
	 * Join strings in kebab-case.
	 *
	 * 	// 'foo-bar-wee'
	 * 	$mol_type_case_kebab< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_kebab< Parts extends Array< string > > =
		$mol_type_string_join< Parts, '-' >

	/**
	 * Join strings in dot.case.
	 *
	 * 	// 'foo.bar.wee'
	 * 	$mol_type_case_dot< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_dot< Parts extends Array< string > > =
		$mol_type_string_join< Parts, '.' >

	/**
	 * Join strings in camelCase.
	 *
	 * 	// 'fooBarWee'
	 * 	$mol_type_case_camel< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_camel< Parts extends Array< string > > =
		$mol_type_string_join<
			[
				Lowercase< $mol_type_head< Parts > >,
				... Extract<
					$mol_type_case_capital_values<
						$mol_type_case_lower_values<
							$mol_type_tail< Parts >
						>
					>,
					Array< string >
				>
			],
			''
		>

	/**
	 * Join strings in PascalCase.
	 *
	 * 	// 'FooBarWee'
	 * 	$mol_type_case_pascal< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_pascal< Parts extends Array< string > > =
		$mol_type_string_join<
			$mol_type_case_capital_values<
				$mol_type_case_lower_values<
					Parts
				>
			>,
			''
		>

	/**
	 * Join strings in Cobra_case.
	 *
	 * 	// 'Foo_bar_wee'
	 * 	$mol_type_case_cobra< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_cobra< Parts extends Array< string > > =
		$mol_type_string_join<
			[
				Capitalize< Lowercase< $mol_type_head< Parts > > >,
				... Extract<
					$mol_type_case_lower_values<
						$mol_type_tail< Parts >
					>,
					Array< string >
				>,
			],
			'_'
		>

}
