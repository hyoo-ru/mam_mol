namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		'Bidi bind fallback'( $ ) {
			
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

		'Bidi bind legacy value'( $ ) {
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
		
		'Bidi bind in dictionary'( $ ) {
			
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

		'Bidi bind chaining'( $ ) {
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

		'Bidi bind indexed'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					indexed*? <=> owner*? null
			`)
			const foo = Foo.make({ $ })

			foo.owner(1, 'a')
			foo.owner(2, 'b'),

			$mol_assert_like(
				foo.owner(1),
				foo.indexed(1),
				'a'
			)

			$mol_assert_like(
				foo.owner(1, 'a2'),
				foo.indexed(1),
				'a2'
			)

			$mol_assert_like(
				foo.owner(2),
				foo.indexed(2),
				'b'
			)
		},

		'Bidi bind indexed second level'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					indexed*? $mol_object
						expanded <=> owner*? null
			`)
			const foo = Foo.make({ $ })


			foo.owner(1, 'a')
			foo.owner(2, 'b')

			$mol_assert_like(
				foo.owner(1),
				foo.indexed(1).expanded(),
				'a'
			)

			$mol_assert_like(
				foo.owner(2),
				foo.indexed(2).expanded(),
				'b'
			)
		},

		'Bidi bind doubing right part with same default'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b? null
					c? <=> b? null
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.c(),
				foo.a(),
				null
			)
		},

		'Bidi bind with separate default in right part'( $ ) {

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

		'Bidi bind index from outer scope throws error'( $ ) {
			$mol_assert_fail(() => {
				const { Foo } = run(`
					Foo $mol_object
						a!? $mol_object
							expanded <=> cell_expanded!? null
				`)
			})
		},

		'Bidi bind with default object'( $ ) {

			const { Foo } = run(`
				Foo $mol_object
					class?val <=> owner?val $mol_object
			`)
			const foo = Foo.make({ $ })
			const view = new $mol_object
			foo.owner(view)

			$mol_assert_like(
				foo.owner(),
				foo.class(),
				view
			)
		},
		
		'Bidi bind localized default value'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					a? <=> b? @ \\some1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.a(),
				'Foo_b',
			)
		
		},

		'Bidi bind localized in object'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					obj *
						loc? <=> outer? @ \\test1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.obj().loc(),
				foo.outer(),
				'Foo_outer'
			)
		},

	})
	
}
