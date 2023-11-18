namespace $ {

	$mol_test({
		
		'simple empty class'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_empty_class_foo
			
			$mol_assert_ok(_foo.make({ $ }) instanceof _foo)
		},

		'simple mutable and read only channels'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_foo
			
			const foo = _foo.make({ $ })
			
			$mol_assert_equal(
				foo.readonly(),
				// @ts-ignore
				foo.readonly( 1 ),
				foo.readonly(),
				null,
			)
			
			$mol_assert_equal(
				foo.mutable(),
				null,
			)
				
			$mol_assert_equal(
				foo.mutable(2),
				foo.mutable(),
				2,
			)
			
		},
		
		'simple string channel'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_string_foo
			
			$mol_assert_equal(
				_foo.make({ $ }).hardcoded(),
				'First\nSecond',
			)
			
			$mol_assert_equal(
				_foo.make({ $ }).localized(),
				`$mol_view_tree2_to_js_test_ex_simple_string_foo_localized`,
			)
		},
		
		'simple default indexed channel'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_default_indexed_foo

			const foo = _foo.make({ $ })

			$mol_assert_equal(
				foo.a_b(0, 1),
				foo.a_b(0),
				1
			)

			$mol_assert_equal(
				foo.legacy(0, 1),
				foo.legacy(0),
				1
			)
		},

		'simple empty legacy indexed channel throws error'( $ ) {
			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						a!? null
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/3` )

			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						b! 1
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/2` )
		},

		'simple two classes'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_two_classes_foo
			const _bar = $mol_view_tree2_to_js_test_ex_simple_two_classes_bar
			const a = _foo.make( { $ })
			const b = _bar.make( { $ })

			$mol_assert_ok(b instanceof _foo)
			$mol_assert_ok(b instanceof _bar)

			$mol_assert_equal( a.str(), 'some')
			$mol_assert_equal( b.str(), 'some2')
		},

		'simple commented node'( $ ) {
			const { Foo } = $mol_view_tree2_to_js_test_run(`
				- Foo $mol_object
					a!? $mol_object
						expanded <=> cell_test_expanded!? null
			`)
			$mol_assert_ok(Foo === undefined)
		},

		'simple factory props'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_factory_props_foo
			const foo = _foo.make({ $ })

			$mol_assert_ok(typeof foo.button().sub === 'function')

			$mol_assert_ok(typeof foo.button().some === 'function')

			$mol_assert_equal(
				foo.button().loc(),
				`$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_loc`
			)

			$mol_assert_equal(
				foo.button().sub()[0],
				1
			)
		},

		'simple nan' ($) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_nan_foo
			const foo = _foo.make({ $ })
			type assert_a = $mol_type_assert<ReturnType<typeof foo['a']>, number>
			type assert_d = $mol_type_assert<ReturnType<typeof foo['d']>, number>
			type assert_f = $mol_type_assert<ReturnType<typeof foo['f']>, number>
			$mol_assert_equal(foo.a(), foo.b(), foo.c(), NaN)
			$mol_assert_equal(foo.d(), Infinity)
			$mol_assert_equal(foo.e(), -Infinity)
			$mol_assert_equal(foo.f(), Infinity)
		},

		'simple typed null'($) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_typed_null_foo
			const foo = _foo.make({ $ })
			type a1 = $mol_type_assert<ReturnType<typeof foo.a>, string | number | null>

			$mol_assert_equal(
				foo.a(),
				null
			)
		},

		'extra char' ($) {
			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						item_чount 50
				`)
			})
		},
	})
	
}
