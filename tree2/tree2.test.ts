namespace $ {
	$mol_test( {
		
		'inserting'($) {
			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b\n' )
					.insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' , 'd' )
					.toString(),
				'a b c x\n',
			)

			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b\n' )
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 , 0 )
					.toString(),
				'a b \\\n\tx\n'
			)

			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , null , null , null )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b\n' )
					.insert( $mol_tree2.struct('x') , null , null , null , null )
					.toString(),
				'a b \\\n\tx\n',
			)
			
		},
		
		'deleting'($) {

			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b c d\n' )
					.insert( null , 'a' , 'b' , 'c' )
					.toString(),
				'a b\n',
			)
			
			$mol_assert_equal(
				$.$mol_tree2_from_string( 'a b c d\n' )
					.insert( null , 0, 0, 0 )
					.toString(),
				'a b\n',
			)
			
		} ,

		'hack'($) {

			const res = $.$mol_tree2_from_string( `foo bar xxx\n` )
			.hack({
				'bar' : ( input , belt )=> [ input.struct( '777' , input.hack( belt ) ) ] ,
			})

			$mol_assert_equal( res.map( String ) , [ 'foo 777 xxx\n' ] )

		} ,

	} )	
}
