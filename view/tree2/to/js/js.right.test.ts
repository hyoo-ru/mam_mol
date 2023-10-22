namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id

	$mol_test({
		
		'Right bind read only'( $ ) {
			const id = test_id()
			const $2 = run(`
				${id}Foo Object
					a*? null
				${id}Bar Object
					Obj ${id}Foo
						a*? => b*?
			`)

			const { [`${id}Bar`]: Bar } = $2
			
			const bar = Bar.make({ $: $2 })

			$mol_assert_like(
				bar.Obj().a(1),
				bar.b(1)
			)
			
		},

		'Right bind in left bind'( $ ) {
			const id = test_id()
			const $2 = run(`
				${id}Foo Object
					a null
				${id}Bar Object
					foo <= Cls ${id}Foo
						a => b
			`)

			const { [`${id}Bar`]: Bar } = $2
			
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
			const id = test_id()
			const $2 = run(`
				${id}Foo Object
					a? *
						some 123
				${id}Bar Object
					Cls* ${id}Foo
						a => b*
			`)

			const { [`${id}Bar`]: Bar } = $2
			
			const bar = Bar.make({ $: $2 })

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
