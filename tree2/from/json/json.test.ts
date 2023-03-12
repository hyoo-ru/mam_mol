namespace $ {
	$mol_test( {
		
		'fromJSON'() {
			$mol_assert_equal( $mol_tree2_from_json([]).toString() , '/\n' )
			$mol_assert_equal( $mol_tree2_from_json([ false , true ]).toString() , '/\n\tfalse\n\ttrue\n' )
			$mol_assert_equal( $mol_tree2_from_json([ 0 , 1 , 2.3 ]).toString() , '/\n\t0\n\t1\n\t2.3\n' )
			$mol_assert_equal( $mol_tree2_from_json( new Uint16Array([ 1, 10, 256 ]) ).toString() , '\\\x01\x00\n\\\x00\x00\x01\n' )
			$mol_assert_equal( $mol_tree2_from_json([ '' , 'foo' , 'bar\nbaz' ]).toString() , '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n' )
			$mol_assert_equal( $mol_tree2_from_json({ 'foo' : false , 'bar\nbaz' : 'lol' }).toString() , '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n' )
		} ,
		
	} )	
}
