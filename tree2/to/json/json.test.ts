namespace $ {
	$mol_test({
		
		'atoms'($) {
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "null\n" ).kids[0] ) , null )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "true\n" ).kids[0] ) , true )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "false\n" ).kids[0] ) , false )
		},
		
		'numbers'($) {
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "1\n" ).kids[0] ) , 1 )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "1.2\n" ).kids[0] ) , 1.2 )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "1.2e+2\n" ).kids[0] ) , 120 )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "NaN\n" ).kids[0] ) , Number.NaN )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "+Infinity\n" ).kids[0] ) , Number.POSITIVE_INFINITY )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "-Infinity\n" ).kids[0] ) , Number.NEGATIVE_INFINITY )
		},
		
		'string'($) {
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "\\foo\n" ).kids[0] ) , 'foo' )
			$mol_assert_equal( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "\\\n\t\\foo\n\t\\bar\n" ).kids[0] ) , 'foo\nbar' )
		},
		
		'array'($) {
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "/\n" ).kids[0] ) , [] )
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "/\n\t\\foo\n\t\\bar\n" ).kids[0] ) , [ 'foo', 'bar' ] )
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "/\n\t- \\foo\n\t\\bar\n" ).kids[0] ) , [ 'bar' ] )
		},
		
		'object'($) {
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "*\n" ).kids[0] ) , {} )
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "*\n\t\\foo\n\t\t\\bar\n" ).kids[0] ) , { foo: 'bar' } )
			$mol_assert_like( $.$mol_tree2_to_json( $.$mol_tree2_from_string( "*\n\t\\\n\t\t\\foo\n\t\t\\bar\n\t\t\\lol\n" ).kids[0] ) , { 'foo\nbar': 'lol' } )
		},
		
	})
}
