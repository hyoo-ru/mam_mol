namespace $ {

	$mol_test({
		
		'Left bind read only'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_left_read_only_foo
			
			const foo = _foo.make({ $ })
			
			$mol_assert_like(
				foo.bar1(),
				// @ts-ignore
				foo.bar1( 2 ),
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
		},

		'Left bind second level index'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_left_second_level_index_foo
			const foo = _foo.make({ $ })

			$mol_assert_ok(foo.owner(1) instanceof $mol_view)
			$mol_assert_like(
				foo.some(1),
				foo.some(1),
				`$mol_view_tree2_to_js_test_ex_left_second_level_index_foo_some`
			)

			$mol_assert_equal(
				foo.owner(1),
				foo.cls(1),
			)

			$mol_assert_equal(
				foo.owner(1).localized(),
				foo.some(1),
			)

			$mol_assert_equal(
				foo.cls(2),
				foo.owner(2),
			)
		},

		'Left bind in array and object'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo
			const foo = _foo.make({ $ })

			$mol_assert_equal(
				foo.obj().prop,
				foo.arr()[0],
				foo.Obj()
			)
		},

		'Left bind with separate default and comment'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_foo
			const foo = _foo.make({ $ })

			$mol_assert_like(
				foo.Obj().rows(),
				[ 123 ]
			)
		},

		'Left bind chaining'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_left_chaining_foo
			const foo = _foo.make({ $ })

			$mol_assert_equal(
				foo.c(),
				foo.b(),
				foo.a(),
				0
			)

			$mol_assert_equal(
				foo.c(1),
				1
			)
			$mol_assert_equal(
				foo.b(),
				foo.a(),
				1
			)
			$mol_assert_equal(
				// @ts-ignore
				foo.a(2),
				foo.c()
			)
		},


	})
	
}
