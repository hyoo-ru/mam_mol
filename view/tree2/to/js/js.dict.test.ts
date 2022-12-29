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
		
	})
	
}
