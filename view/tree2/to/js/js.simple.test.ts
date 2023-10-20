namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id

	$mol_test({
		
		'simple empty class'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
			`)
			
			Foo.make({ $ })
			
		},

		'simple mutable and read only channels'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					readonly null
					mutable? null
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.readonly(),
				foo.readonly( 1 ),
				foo.readonly(),
				null,
			)
			
			$mol_assert_like(
				foo.mutable(),
				null,
			)
				
			$mol_assert_like(
				foo.mutable(2),
				foo.mutable(),
				2,
			)
			
		},
		
		'simple string channel'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					hardcoded \\
						\\First
						\\Second
					localized @ \\
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).hardcoded(),
				'First\nSecond',
			)
			
			$mol_assert_like(
				Foo.make({ $ }).localized(),
				`${id}Foo_localized`,
			)
			
		},
		
		'simple default indexed channel'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					a*? null
			`)

			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.a(0, 1),
				foo.a(0),
				1
			)
			
		},

		'simple empty legacy indexed channel throws error'( $ ) {
			const id = test_id()
			$mol_assert_fail(() => {
				run(`
					${id}Foo $mol_object
						a!? null
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/3` )

			$mol_assert_fail(() => {
				run(`
					${id}Foo $mol_object
						b! 1
				`)
			}, `Cannot destructure property 'name' of 'prop_parts(...)' as it is undefined. at ?#3:7/2` )
		},

		'simple two classes'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo, [`${id}Bar`]: Bar } = run(`
				${id}Foo $mol_object
					str \\some
				${id}Bar ${id}Foo
					str \\some2
			`)
			const a = Foo.make( { $ })
			const b = Bar.make( { $ })

			$mol_assert_ok(b instanceof Foo)
			$mol_assert_ok(b instanceof Bar)

			$mol_assert_like( a.str(), 'some')
			$mol_assert_like( b.str(), 'some2')
		},

		'simple commented node'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo, [`${id}Bar`]: Bar } = run(`
				${id}Foo $mol_object
					str \\some
				- ${id}Bar ${id}Foo
					str \\some2
			`)

			const a = Foo.make( { $ })
			$mol_assert_ok(a instanceof Foo)
			$mol_assert_ok(Bar === undefined)
		},

		'simple factory props'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					button $mol_object
						some true
						loc @ \\v1
						sub /
							1
			`)

			const foo = Foo.make({ $ })

			$mol_assert_ok(typeof foo.button().sub === 'function')

			$mol_assert_ok(typeof foo.button().some === 'function')

			$mol_assert_like(
				foo.button().loc(),
				`${id}Foo_button_loc`
			)

			$mol_assert_like(
				foo.button().sub()[0],
				1
			)
		},
	})
	
}
