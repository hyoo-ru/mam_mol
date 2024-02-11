namespace $ {

	$mol_test({
		
		'Right bind read only'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_right_read_only_bar
			
			const bar = _bar.make({ $: _bar.$ })

			$mol_assert_like(
				bar.Obj().a(1),
				bar.b(1)
			)
			
		},

		'Right bind in left bind'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_right_in_left_bar
			
			const bar = _bar.make({ $: _bar.$ })

			$mol_assert_like(
				bar.foo(),
				bar.Cls(),
			)

			$mol_assert_like(
				bar.foo().a(),
				bar.Cls().a(),
				bar.b()
			)
		},

		'Right bind indexed'( $ ) {
			const _bar = $mol_view_tree2_to_js_test_ex_right_indexed_bar
			
			const bar = _bar.make({ $: _bar.$ })

			$mol_assert_equal(
				bar.Cls(1).a(),
				bar.b(1),
			)

			$mol_assert_like(
				bar.b(1),
				{ some: 123 }
			)

			$mol_assert_equal(
				bar.Cls(1).a() === bar.b(2),
				false,
			)
		},

		'Right hierarchy'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_right_hierarchy_foo
			const foo = _foo.make({ $: _foo.$ })
			type prj_user_id_assert = $mol_type_assert<ReturnType<typeof foo['prj_user_id']>, number >
			type prj_domain_assert = $mol_type_assert<ReturnType<typeof foo['prj_domain']>, {
				user: () => { id: () => number }
			} >

			$mol_assert_like(
				foo.prj_user_id(1),
				2
			)
		},

		'Right mixed args'( $ ) {
			const _foo = $mol_view_tree2_to_js_test_ex_right_hierarchy_foo
			const foo = _foo.make({ $: _foo.$ })
			foo.indexed_id = id => id + 25

			$mol_assert_like( foo.indexed_title(1), 123 )
			$mol_assert_like( foo.Indexed(0).id(), 25 )
			$mol_assert_like( foo.Indexed(1).id(), 26 )
			$mol_assert_like( foo.indexed_title(0, 2), 125 )
		}

	})
	
}
