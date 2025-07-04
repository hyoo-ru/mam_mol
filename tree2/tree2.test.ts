namespace $ {
	
	function check( tree: $mol_tree2, ideal: string ) {
		$mol_assert_equal(
			tree.toString(),
			$$.$mol_tree2_from_string( ideal ).toString(),
		)
	}
	
	$mol_test( {
		
		'inserting'($) {
			
			check(
				$.$mol_tree2_from_string( `
					a b c d
				`).insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' ),
				`
					a b x
				`,
			)
			check(
				$.$mol_tree2_from_string(`
					a b
				`).insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' , 'd' ),
				`
					a b c x
				`,
			)

			check(
				$.$mol_tree2_from_string(`
					a b c d
				`)
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 ),
				`
					a b x
				`,
			)
			check(
				$.$mol_tree2_from_string(`
					a b
				`)
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 , 0 ),
				`
					a b \\
						x
				`,
			)

			check(
				$.$mol_tree2_from_string(`
					a b c d
				`)
					.insert( $mol_tree2.struct('x') , null , null , null ),
				`
					a b x
				`,
			)
			check(
				$.$mol_tree2_from_string(`
					a b
				`)
					.insert( $mol_tree2.struct('x') , null , null , null , null ),
				`
					a b \\
						x
				`,
			)
			
		},
		
		'updating'($) {

			check(
				$.$mol_tree2_from_string(`
					a b c d
				`).update( [], 'a', 'b', 'c' )[0],
				`
					a b
				`,
			)
			
			check(
				$.$mol_tree2_from_string(`
					a b c d
				`).update( [ $mol_tree2.struct('x') ] )[0],
				`
					x
				`,
			)
			
			check(
				$.$mol_tree2_from_string(`
					a b c d
				`).update( [ $mol_tree2.struct('x'), $mol_tree2.struct('y') ], 'a', 'b', 'c' )[0],
				`
					a b
						x
						y
				`,
			)
			
		} ,

		'deleting'($) {
			
			const base = $.$mol_tree2_from_string(`
				a b c d
			`)

			check(
				base.insert( null , 'a' , 'b' , 'c' ),
				`
					a b
				`,
			)
			
			check(
				base.update( base.select( 'a', 'b', 'c', null ).kids , 'a' , 'b' , 'c' )[0],
				`
					a b d
				`,
			)
			
			check(
				base.insert( null , 0, 0, 0 ),
				`
					a b
				`,
			)
			
		} ,

		'hack'($) {

			const res = $.$mol_tree2_from_string(`
				foo bar xxx
			`)
			.hack({
				'bar' : ( input , belt )=> [ input.struct( '777' , input.hack( belt ) ) ] ,
			})

			$mol_assert_equal( res.map( String ) , [ 'foo 777 xxx\n' ] )

		} ,

	} )	
}
