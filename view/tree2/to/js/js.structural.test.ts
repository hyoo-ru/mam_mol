namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id

	$mol_test({
		
		'Structural channel'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					bar *
						alpha 1
						beta *
						xxx <= lol 2
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				{
					alpha: 1,
					beta: {},
					xxx: 2,
				},
			)
			
		},
		
		'Structural channel with inheritance'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo, [`${id}Bar`]: Bar } = run(`
				${id}Foo $mol_object
					field *
						xxx 123
				${id}Bar ${id}Foo
					field *
						yyy 234
						^
						zzz 345
			`)
			
			$mol_assert_like(
				Bar.make({ $ }).field(),
				{
					yyy: 234,
					xxx: 123,
					zzz: 345,
				},
			)
			
		},
		
		'Structural channel spread other channel'( $ ) {
			const id = test_id()
			const { [`${id}Bar`]: Bar } = run(`
				${id}Bar $mol_object
					test *
						aaa 123
					field *
						bbb 321
						^ test
			`)
			
			$mol_assert_like(
				Bar.make({ $ }).field(),
				{
					bbb: 321,
					aaa: 123,
				},
			)
			
		},

		'Structural channel localized prop value'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					bar *
						loc @ \\v1
						baz *
							loc2 @ \\v2
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.bar(),
				{
					'loc': `${id}Foo_bar_loc`,
					'baz': { 'loc2': `${id}Foo_bar_baz_loc2` }
				},
			)
			
		},

		'Structural channel quoted props'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo $mol_object
					bar *
						$a 1
						b-t *
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				{
					'$a': 1,
					'b-t': {},
				},
			)
			
		},

	})
	
}
