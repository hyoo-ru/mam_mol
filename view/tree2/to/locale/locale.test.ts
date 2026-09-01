namespace $ {

	const run = $mol_data_pipe(
		$mol_tree2_from_string.bind($$),
		$mol_view_tree2_to_locale.bind($$)
	)

	$mol_test({
		'Locale simple'( $ ) {
			const locales = run(`
				Foo Object
					localized @ \\bla
			`)
			$mol_assert_equal(locales['Foo_localized'], 'bla')
		},

		'Locale structural'( $ ) {
			const locales = run(`
				Foo Object
					bar *
						loc @ \\v1
						baz *
							loc2 @ \\v2
			`)
			$mol_assert_equal(locales['Foo_bar_loc'], 'v1')
			$mol_assert_equal(locales['Foo_bar_baz_loc2'], 'v2')
		},

		'Locale factory'( $ ) {
			const locales = run(`
				Bar Object
					loc \\v0
				Foo Object
					button Bar
						loc @ \\v1
			`)
			$mol_assert_equal(locales['Foo_button_loc'], 'v1')
		},

		'Locale bidi bind localized'( $ ) {
			const locales = run(`
				Foo Object
					a? <=> b? @ \\v1
			`)
			$mol_assert_equal(locales['Foo_b'], 'v1')
		},

	
	})
}
