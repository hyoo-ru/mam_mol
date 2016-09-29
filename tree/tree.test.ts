module $ {
	
	$mol_test( test => {
		test.equal( $mol_tree.fromString( "foo\nbar\n" ).childs.length , 2 )
		test.equal( $mol_tree.fromString( "foo\nbar\n" ).childs[ 1 ].type , "bar" )
		test.equal( $mol_tree.fromString( "foo\n\n\n" ).childs.length , 1 )
		
		test.equal( $mol_tree.fromString( "=foo\n\\bar\n" ).childs.length , 2 )
		test.equal( $mol_tree.fromString( "=foo\n\\bar\n" ).childs[ 1 ].data , "bar" )
		
		test.equal( $mol_tree.fromString( "foo bar \\pol" ).childs[ 0 ].childs[ 0 ].childs[ 0 ].data , "pol" )
		test.equal( $mol_tree.fromString( "foo bar\n\t\\pol\n\t\\men" ).childs[ 0 ].childs[ 0 ].childs[ 1 ].data , "men" )
		
		test.equal( $mol_tree.fromString( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
	} )
	
}
