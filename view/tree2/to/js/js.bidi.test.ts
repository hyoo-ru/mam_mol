namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		'Fallback bind'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar1? <=> bar2? 1
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
			$mol_assert_like(
				foo.bar1( 1 ),
				foo.bar1(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2(),
				2,
			)
			
			$mol_assert_like(
				foo.bar2( 3 ),
				foo.bar2(),
				foo.bar1(),
				3,
			)
			
		},

		'legacy bind'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					a?v <=> b?v 1
			`)

			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.a(),
				foo.b(),
				1,
			)

			$mol_assert_like(
				foo.b( 2 ),
				foo.a(),
				2,
			)
		},

		'localized default value'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b? @ \some1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.a(),
				'<Foo_b>',
			)
		
		},
		
		'Structural bidi channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					event *
						click? <=> run? null
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).event().click({}),
				{},
			)
			
		},

		'bind, chaining'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b? <=> c? null
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.c(),
				foo.b(),
				foo.a()
			)
		},

		'bind, no default not throws error'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b?
			`)
			const foo = Foo.make({ $ })

			$mol_assert_fail(() => {
				foo.a()
			})
		},

		'bind, default no args not throws error'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b?
					b null
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(1),
				null
			)

			$mol_assert_like(
				foo.a(1),
				1
			)
		},

		'bind with separate default'( $ ) {

			const { Foo } = run(`
				Foo $mol_object
					a? <=> b?
					b? null
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.a()
			)
		},

		'bind, index from outer scope throws error'( $ ) {
			$mol_assert_fail(() => {
				const { Foo } = run(`
					Foo $mol_object
						a!? $mol_object
							expanded <=> cell_expanded!? null
				`)
			})
		},

		'bind, method defined with another value error'( $ ) {
			$mol_assert_fail(() => {
				const { Foo } = run(`
					Foo $mol_object
						arr /
							*
								loc?v <=> loc_outer?v @ \test1
							*
								loc?v <=> loc_outer?v @ \test2
				`)
			})
		},

		'bind, structural bidi localize'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					arr /
						*
							loc?v <=> loc_outer?v @ \\test1
						*
							loc?v <=> loc_outer?v @ \\test1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.arr()[1].loc(),
				foo.arr()[0].loc(),
				'<Foo_loc_outer>'
			)
		},

		'bind with default object'( $ ) {

			const { Foo } = run(`
				Foo $mol_object
					class?val <=> class_owner?val $mol_object
			`)
			const foo = Foo.make({ $ })
			const view = new $mol_object
			foo.class_owner(view)

			$mol_assert_like(
				foo.class_owner(),
				foo.class(),
				view
			)
		},
		
	})
	
}
