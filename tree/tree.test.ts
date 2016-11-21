namespace $ {
	$mol_test( {
		
		'tree parsing'() {
			
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).childs.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).childs[ 1 ].type , "bar" )
			$mol_assert_equal( $mol_tree.fromString( "foo\n\n\n" ).childs.length , 1 )
			
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).childs.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).childs[ 1 ].data , "bar" )
			
			$mol_assert_equal( $mol_tree.fromString( "foo bar \\pol" ).childs[ 0 ].childs[ 0 ].childs[ 0 ].data , "pol" )
			$mol_assert_equal( $mol_tree.fromString( "foo bar\n\t\\pol\n\t\\men" ).childs[ 0 ].childs[ 0 ].childs[ 1 ].data , "men" )
			
			$mol_assert_equal( $mol_tree.fromString( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
		} ,
		
	} )	
}
