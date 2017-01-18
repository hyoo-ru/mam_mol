namespace $ {
	$mol_test( {
		
		'tree parsing'() {
			
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).sub.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).sub[ 1 ].type , "bar" )
			$mol_assert_equal( $mol_tree.fromString( "foo\n\n\n" ).sub.length , 1 )
			
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).sub.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).sub[ 1 ].data , "bar" )
			
			$mol_assert_equal( $mol_tree.fromString( "foo bar \\pol" ).sub[ 0 ].sub[ 0 ].sub[ 0 ].data , "pol" )
			$mol_assert_equal( $mol_tree.fromString( "foo bar\n\t\\pol\n\t\\men" ).sub[ 0 ].sub[ 0 ].sub[ 1 ].data , "men" )
			
			$mol_assert_equal( $mol_tree.fromString( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
		} ,
		
	} )	
}
