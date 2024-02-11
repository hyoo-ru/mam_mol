namespace $ {

	$mol_test({
		'Bidi bind fallback'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_fallback_foo
			const foo = _foo.make({ })
			
			$mol_assert_equal(
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_equal(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
			$mol_assert_equal(
				foo.bar1( 1 ),
				foo.bar1(),
				1,
			)
			
			$mol_assert_equal(
				foo.bar1( 1 ),
				foo.bar2(),
				1,
			)
			
			$mol_assert_equal(
				foo.bar2( 3 ),
				foo.bar2(),
				foo.bar1(),
				3,
			)
			
		},

		'Bidi bind legacy value'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_legacy_value_foo

			const foo = _foo.make({ $ })
			
			$mol_assert_like(
				foo.a(),
				foo.b(),
				1,
			)

			$mol_assert_like(
				foo.b( 2 ),
				foo.a(),
				2,
			)
		},
		
		'Bidi bind in dictionary'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_in_dictionary_foo
			
			$mol_assert_like(
				_foo.make({ $ }).event().click({}),
				{},
			)
			
		},

		'Bidi bind chaining'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_chaining_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.c(),
				foo.b(),
				foo.a()
			)
		},

		'Bidi bind indexed'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_indexed_foo
			const foo = _foo.make({ $ })

			foo.owner(1, 'a')
			foo.owner(2, 'b'),

			$mol_assert_like(
				foo.owner(1),
				foo.indexed(1),
				'a'
			)

			$mol_assert_like(
				foo.owner(1, 'a2'),
				foo.indexed(1),
				'a2'
			)

			$mol_assert_like(
				foo.owner(2),
				foo.indexed(2),
				'b'
			)
		},

		'Bidi bind indexed second level'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo
			const _bar = $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar
			_foo.$.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar = _bar

			const foo = _foo.make({ $ })


			foo.owner(1, 'a')
			foo.owner(2, 'b')

			$mol_assert_like(
				foo.owner(1),
				foo.indexed(1).expanded(),
				'a'
			)

			$mol_assert_like(
				foo.owner(2),
				foo.indexed(2).expanded(),
				'b'
			)
		},

		'Bidi bind doubing right part with same default'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_doubing_right_part_with_same_default_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.c(),
				foo.a(),
				false
			)
		},

		'Bidi bind with separate default in right part'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_with_separate_default_in_right_part_foo
			const foo = _foo.make({ $ })
			$mol_assert_like(
				foo.b(),
				foo.a()
			)
		},

		'Bidi bind index from outer scope throws error'( $ ) {
			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_view
						a!? $mol_view
							expanded <=> cell_test_expanded!? null
				`)
			}, 'Required prop like some*? at `.view.tree#3:7/3` at .view.tree#3:7/3' )
		},

		'Bidi bind with default object'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo
			const foo = _foo.make({ $ })
			const view = new $mol_object
			foo.owner(view)

			$mol_assert_like(
				foo.owner(),
				foo.class(),
				view
			)
		},
		
		'Bidi bind localized default value'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.a(),
				`$mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo_b`,
			)
		
		},

		'Bidi bind localized in object'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.obj().loc(),
				foo.outer(),
				`$mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo_outer`
			)
		},

	})
	
}
