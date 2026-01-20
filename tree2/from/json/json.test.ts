namespace $ {
	$mol_test( {
		
		'fromJSON'() {
			$mol_assert_equal( $mol_tree2_from_json([]).toString() , '/\n' )
			$mol_assert_equal( $mol_tree2_from_json([ false , true ]).toString() , '/\n\tfalse\n\ttrue\n' )
			$mol_assert_equal( $mol_tree2_from_json([ 0 , 1 , 2.3 ]).toString() , '/\n\t0\n\t1\n\t2.3\n' )
			$mol_assert_equal( $mol_tree2_from_json( new Uint16Array([ 1, 10, 255, 256, 65535 ]) ).toString() , '\\01 00 0A 00 FF 00 00 01\n\\FF FF\n' )
			$mol_assert_equal( $mol_tree2_from_json([ '' , 'foo' , 'bar\nbaz' ]).toString() , '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n' )
			$mol_assert_equal( $mol_tree2_from_json({ 'foo' : false , 'bar\nbaz' : 'lol' }).toString() , '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n' )
		} ,
		
	} )	
}
