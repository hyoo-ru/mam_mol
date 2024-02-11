namespace $ {

	$mol_test({
		
		'Structural channel'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_foo
			
			$mol_assert_like(
				_foo.make({ $ }).bar(),
				{
					alpha: 1,
					beta: {},
					xxx: 2,
				},
			)
			
		},
		
		'Structural dict'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_dict_foo
			
			$mol_assert_like(
				_foo.make({ $ }).bar(),
				{
					alpha: 1,
					beta: 'a',
				},
			)
			
		},

		'Structural channel with inheritance'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_structural_with_inheritance_bar
			
			$mol_assert_like(
				_bar.make({ $ }).field(),
				{
					yyy: 234,
					xxx: 123,
					xxy: 'test',
					zzz: 345,
				},
			)
			
		},
		
		'Structural channel spread other'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_spread_other_foo
			const foo = _foo.make({ $ })

			type a1 = $mol_type_assert<
				ReturnType<typeof foo.field>,
				{
					aaa: number
				} & {
					bbb: number
				}
			>

			$mol_assert_like(
				foo.field(),
				{
					bbb: 321,
					aaa: 123,
				},
			)
			
		},

		'Structural channel localized prop value'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.bar(),
				{
					'loc': `$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_loc`,
					'baz': { 'loc2': `$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_baz_loc2` }
				},
			)
			
		},

		'Structural channel quoted props'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_quoted_props_foo

			$mol_assert_like(
				_foo.make({ $ }).bar(),
				{
					'$a': 1,
					'b-t': {},
				},
			)
			
		},

		'Structural complex key'($) {
			const _foo = $mol_view_tree2_to_js_test_ex_structural_complex_key_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.dictionary(),
				{
					'raw data key': '1',
					'key2': '2',
					'key3': '3'
				},
			)
		}

	})
	
}
