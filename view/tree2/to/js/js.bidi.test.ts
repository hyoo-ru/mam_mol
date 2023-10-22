namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id

	$mol_test({
		'Bidi bind fallback'( $ ) {
			const id = test_id()
			
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					event *
						click? <=> run? null
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).event().click({}),
				{},
			)
			
		},

		'Bidi bind chaining'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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
			const id = test_id()
			const { [`${id}Foo`]: Foo, [`${id}Bar`]: Bar } = run(`
				${id}Bar Object
					expanded false
				${id}Foo Object
					indexed*? ${id}Bar
						expanded <=> owner*? false
			`)
			Foo.$[`${id}Bar`] = Bar

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
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					a? <=> b? false
					c? <=> b? false
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.c(),
				foo.a(),
				false
			)
		},

		'Bidi bind with separate default in right part'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					b? false
					a? <=> b?
			`)
			const foo = Foo.make({ $ })
			$mol_assert_like(
				foo.b(),
				foo.a()
			)
		},

		'Bidi bind index from outer scope throws error'( $ ) {
			const id = test_id()
			$mol_assert_fail(() => {
				const { [`${id}Foo`]: Foo } = run(`
					${id}Foo Object
						a!? Object
							expanded <=> cell_expanded!? null
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/3` )
		},

		'Bidi bind with default object'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					class? <=> owner? Object
			`)
			const foo = Foo.make({ $ })
			const view = new Object
			foo.owner(view)

			$mol_assert_like(
				foo.owner(),
				foo.class(),
				view
			)
		},
		
		'Bidi bind localized default value'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					a? <=> b? @ \\some1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.b(),
				foo.a(),
				`${id}Foo_b`,
			)
		
		},

		'Bidi bind localized in object'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					obj *
						loc? <=> outer? @ \\test1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.obj().loc(),
				foo.outer(),
				`${id}Foo_outer`
			)
		},

	})
	
}
