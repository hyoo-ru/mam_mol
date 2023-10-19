namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		
		'Structural channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
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
			
			const { Foo, Bar } = run(`
				Foo $mol_object
					field *
						xxx 123
				Bar Foo
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
			
			const { Bar } = run(`
				Bar $mol_object
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
			
			const { Foo } = run(`
				Foo $mol_object
					bar *
						loc @ \\v1
						baz *
							loc2 @ \\v2
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.bar(),
				{
					'loc': 'Foo_bar_loc',
					'baz': { 'loc2': 'Foo_bar_baz_loc2' }
				},
			)
			
		},

		'Structural channel quoted props'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
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
