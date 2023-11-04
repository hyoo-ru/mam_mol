namespace $ {

	$mol_test({
		
		'Array channel boolean'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_boolean_foo
			const foo = _foo.make({ $ })
			type assert_sub = $mol_type_assert<ReturnType<typeof foo['bar']>, readonly boolean[]>
			$mol_assert_like(
				foo.bar(),
				[ false, true ],
			)
			
		},
		
		'Array channel number'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_number_foo

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
			const _foo = $mol_view_tree2_to_js_test_ex_array_with_types_foo
			const foo = _foo.make({ $ })
			type assert_arr = $mol_type_assert<ReturnType<typeof foo['arr']>, readonly( readonly(number)[] )[]>
			$mol_assert_like(foo.arr(), [])

		},

		'Array channel of array or object'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_of_array_or_object_foo

			$mol_assert_like(
				_foo.make({ $ }).complex(),
				[ [ 1, 'test1', 2 ], { a: 1, str: 'some', nul: null } ]
			)

		},

		'Array channel inheritance'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_array_inheritance_bar

			$mol_assert_like(_bar.make({ $ }).arr(), ['v3', 'v1', 'v4' ])

		},

		'Array channel spread other channel'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_array_spread_other_bar
			const bar = _bar.make({ $ })

			$mol_assert_like(bar.arr(), ['v2', 'v1' ])
			$mol_assert_like(bar.arr()[1], bar.sup()[0])

		},

		'Array slot' ($) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_slot_foo
			const foo = _foo.make({ $ })
			type assert_foot = $mol_type_assert<ReturnType<typeof foo['foot']>, readonly(string | number | boolean)[]>
			$mol_assert_like(foo.foot(), [ 1, 2, true, 'foot1', 'ins1', 1, 'ins2', 'foot2' ])
		},

		'Array indexed' ($) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_indexed_foo
			const foo = _foo.make({ $ })
			type assert_tag = $mol_type_assert<Parameters<typeof foo['tags']>[0], any>
			type assert_slot = $mol_type_assert<Parameters<typeof foo['slot']>[0], any>
			type assert_tag1 = $mol_type_assert<Parameters<typeof foo['tag1']>[0], any>
			type assert_tag2 = $mol_type_assert<Parameters<typeof foo['tag2']>[0], any>
			$mol_assert_like(foo.tags(1), [ 't1', 't2' ])
			$mol_assert_like(foo.slot(1), [ 't2' ])
		},

		'Array constructor tuple'($) {
			const _foo = $mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo
			const foo = _foo.make({ $ })

			type a0 = $mol_type_assert<
				ReturnType<typeof foo['text_blob']>,
				$mol_view_tree2_to_js_test_ex_klass_tuple
			>

			type a1 = $mol_type_assert<
				ReturnType<typeof foo['blobs']>,
				readonly $mol_view_tree2_to_js_test_ex_klass_tuple[]
			>

			$mol_assert_like(
				foo.text_blob().tuple,
				[ '123' ]
			)

			$mol_assert_like(
				foo.blobs(),
				[
					foo.text_blob(),
				]
			)
		},
	})
	
}
