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
	 * Parse snake_case string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_snake_parse< 'foo_bar_wee' >
	 */
	export type $mol_type_case_snake_parse< String extends string > =
		$mol_type_string_split< String, '_' >


	/**
	 * Join strings in kebab-case.
	 *
	 * 	// 'foo-bar-wee'
	 * 	$mol_type_case_kebab< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_kebab< Parts extends Array< string > > =
		$mol_type_string_join< Parts, '-' >

	/**
	 * Parse kebab-case string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_kebab_parse< 'foo-bar-wee' >
	 */
	export type $mol_type_case_kebab_parse< String extends string > =
		$mol_type_string_split< String, '-' >


	/**
	 * Join strings in dot.case.
	 *
	 * 	// 'foo.bar.wee'
	 * 	$mol_type_case_dot< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_dot< Parts extends Array< string > > =
		$mol_type_string_join< Parts, '.' >

	/**
	 * Parse dot.case string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_dot_parse< 'foo.bar.wee' >
	 */
	export type $mol_type_case_dot_parse< String extends string > =
		$mol_type_string_split< String, '.' >


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

	type camel_temp_separator = '.'

	type camel_replace_with_separator< String extends string > =
		String extends `${ infer Left }${ infer Right }`
		?
			`${ Left extends Capitalize< Left > ? camel_temp_separator : '' }${ Lowercase< Left > }${ camel_replace_with_separator< Right > }`
		: String

	/**
	 * Parse camelCase string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_camel_parse< 'fooBarWee' >
	 */
	export type $mol_type_case_camel_parse< String extends string > =
		$mol_type_string_split<
			camel_replace_with_separator< String>,
			camel_temp_separator
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
	 * Parse PascalCase string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_pascal_parse< 'FooBarWee' >
	 */
	export type $mol_type_case_pascal_parse< String extends string > =
		$mol_type_case_camel_parse< String >


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

	/**
	 * Parse Cobra_case string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_cobra_parse< 'Foo_bar_wee' >
	 */
	export type $mol_type_case_cobra_parse< String extends string > =
		$mol_type_case_lower_values<
			$mol_type_string_split<
				String,
				'_'
			>
		>


	/**
	 * Join strings in SCREAM_CASE.
	 *
	 * 	// 'FOO_BAR_WEE'
	 * 	$mol_type_case_scream< [ 'foo', 'bar', 'wee' ] >
	 */
	export type $mol_type_case_scream< Parts extends Array< string > > =
		$mol_type_string_join<
			$mol_type_case_upper_values< Parts >,
			'_'
		>

	/**
	 * Parse SCREAM_CASE string into parts.
	 *
	 * 	// [ 'foo', 'bar', 'wee' ]
	 * 	$mol_type_case_scream_parse< 'FOO_BAR_WEE' >
	 */
	export type $mol_type_case_scream_parse< String extends string > =
		$mol_type_case_cobra_parse< String >

}
