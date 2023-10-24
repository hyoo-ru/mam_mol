namespace $ {

	$mol_test({
		
		'Array channel boolean'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_channel_boolean_foo
			
			$mol_assert_like(
				_foo.make({ $ }).bar(),
				[ false, true ],
			)
			
		},
		
		'Array channel number'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_channel_number_foo

			$mol_assert_like(
				_foo.make({ $ }).bar(),
				[
					// Number.NaN,
					Number.NEGATIVE_INFINITY,
					Number.POSITIVE_INFINITY,
					0,
				],
			)
			
		},
		
		'Array channel with types'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_channel_with_types_foo
			const foo = _foo.make({ $ })
			type assert_arr = $mol_type_assert<ReturnType<typeof foo['arr']>, readonly( readonly(number)[] )[]>
			$mol_assert_like(foo.arr(), [])

		},

		'Array channel of array or object'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_channel_of_array_or_object_foo

			$mol_assert_like(
				_foo.make({ $ }).complex(),
				[ [ 'test1' ], { str: 'some', nul: null } ]
			)

		},

		'Array channel inheritance'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_array_channel_inheritance_bar

			$mol_assert_like(_bar.make({ $ }).arr(), ['v3', 'v1', 'v4' ])

		},

		'Array channel spread other channel'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_array_channel_spread_other_channel_bar
			const bar = _bar.make({ $ })

			$mol_assert_like(bar.arr(), ['v2', 'v1' ])
			$mol_assert_like(bar.arr()[1], bar.sup()[0])

		},
	})
	
}
