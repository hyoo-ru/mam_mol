namespace $ {

	$mol_test({
		
		'simple empty class'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_empty_class_foo
			
			_foo.make({ $ })
			
		},

		'simple mutable and read only channels'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_channels_foo
			
			const foo = _foo.make({ $ })
			
			$mol_assert_like(
				foo.readonly(),
				// @ts-ignore
				foo.readonly( 1 ),
				foo.readonly(),
				null,
			)
			
			$mol_assert_like(
				foo.mutable(),
				null,
			)
				
			$mol_assert_like(
				foo.mutable(2),
				foo.mutable(),
				2,
			)
			
		},
		
		'simple string channel'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_string_channel_foo
			
			$mol_assert_like(
				_foo.make({ $ }).hardcoded(),
				'First\nSecond',
			)
			
			$mol_assert_like(
				_foo.make({ $ }).localized(),
				`$mol_view_tree2_to_js_test_ex_simple_string_channel_foo_localized`,
			)
		},
		
		'simple default indexed channel'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_default_indexed_channel_foo

			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.a(0, 1),
				foo.a(0),
				1
			)
			
		},

		'simple empty legacy indexed channel throws error'( $ ) {
			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_view
						a!? null
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/3` )

			$mol_assert_fail(() => {
				$mol_view_tree2_to_js_test_run(`
					Foo $mol_view
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

			$mol_assert_like( a.str(), 'some')
			$mol_assert_like( b.str(), 'some2')
		},

		'simple commented node'( $ ) {
			const { Foo } = $mol_view_tree2_to_js_test_run(`
				- Foo $mol_view
					a!? $mol_view
						expanded <=> cell_test_expanded!? null
			`)
			$mol_assert_ok(Foo === undefined)
		},

		'simple factory props'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_simple_factory_props_foo

			const foo = _foo.make({ $ })

			$mol_assert_ok(typeof foo.button().sub === 'function')

			$mol_assert_ok(typeof foo.button().some === 'function')

			$mol_assert_like(
				foo.button().loc(),
				`$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_loc`
			)

			$mol_assert_like(
				foo.button().sub()[0],
				1
			)
		},
	})
	
}
