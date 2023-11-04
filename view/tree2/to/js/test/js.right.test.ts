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
		}

	})
	
}
