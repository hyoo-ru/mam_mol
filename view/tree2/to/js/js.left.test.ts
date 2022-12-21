namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		
		'Read only bind'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar1 <= bar2? 1
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.bar1(),
				foo.bar1( 2 ),
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
		},
		
	})
	
}
