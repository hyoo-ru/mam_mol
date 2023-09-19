namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		
		'Right bind read only'( $ ) {
			const $2 = run(`
				Foo $mol_object
					a*? null
				Bar $mol_object
					Obj Foo
						a*? => b*?
			`)

			const { Bar } = $2
			
			const bar = Bar.make({ $: $2 })

			$mol_assert_like(
				bar.Obj().a(1),
				bar.b(1)
			)
			
		},

		'Right bind in left bind'( $ ) {
			const $2 = run(`
				Foo $mol_object
					a null
				Bar $mol_object
					foo <= Cls Foo
						a => b
			`)

			const { Bar } = $2
			
			const bar = Bar.make({ $: $2 })

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
			const $2 = run(`
				Foo $mol_object
					a*? *
						some 123
				Bar $mol_object
					Cls* Foo
						a => b*
			`)

			const { Bar } = $2
			
			const bar = Bar.make({ $: $2 })

			$mol_assert_equal(
				bar.Cls(1).a(),
				bar.b(1),
			)

			$mol_assert_like(
				bar.b(1),
				{ some: 123 }
			)

			$mol_assert_unique(
				bar.Cls(1).a(), bar.b(2)
			)
		}

	})
	
}
