namespace $ {
	$mol_test( {
		
		'inserting'() {
			$mol_assert_equal(
				$mol_tree2.fromString( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$mol_tree2.fromString( 'a b\n' )
					.insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' , 'd' )
					.toString(),
				'a b c x\n',
			)

			$mol_assert_equal(
				$mol_tree2.fromString( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$mol_tree2.fromString( 'a b\n' )
					.insert( $mol_tree2.struct('x') , 0 , 0 , 0 , 0 )
					.toString(),
				'a b \\\n\tx\n'
			)

			$mol_assert_equal(
				$mol_tree2.fromString( 'a b c d\n' )
					.insert( $mol_tree2.struct('x') , null , null , null )
					.toString(),
				'a b x\n',
			)
			$mol_assert_equal(
				$mol_tree2.fromString( 'a b\n' )
					.insert( $mol_tree2.struct('x') , null , null , null , null )
					.toString(),
				'a b \\\n\tx\n',
			)
		} ,

		'hack'() {

			const res = $mol_tree2.fromString( `foo bar xxx\n` )
			.hack({
				'' : ( tree , belt )=> [ tree.clone( tree.hack( belt ) ) ] ,
				'bar' : ( tree , belt )=> [ tree.struct( '777' , tree.hack( belt ) ) ] ,
			})

			$mol_assert_equal( res.toString() , 'foo 777 xxx\n' )

		} ,

	} )	
}
