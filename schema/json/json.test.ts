namespace $.$$ {
	$mol_test({
		
		"JSON schema"( $ ) {
			
			$mol_assert_equal( '$mol_schema_json', $mol_schema_json + '', $mol_key( $mol_schema_json ) )
			
			$mol_assert_equal( true, $mol_schema_json.check( null ) )
			$mol_assert_equal( true, $mol_schema_json.check( 0 ) )
			$mol_assert_equal( true, $mol_schema_json.check( false ) )
			$mol_assert_equal( true, $mol_schema_json.check( '' ) )
			$mol_assert_equal( true, $mol_schema_json.check( [] ) )
			$mol_assert_equal( true, $mol_schema_json.check( {} ) )
			
			$mol_assert_equal( false, $mol_schema_json.check( undefined ) )
			$mol_assert_equal( false, $mol_schema_json.check( new Date ) )
			$mol_assert_equal( false, $mol_schema_json.check( { __proto__: {} } ) )
			
			$mol_assert_equal( {}, $mol_schema_json.cast( new Date ) )
			$mol_assert_equal( { foo: 777, bar: {} }, $mol_schema_json.cast({ foo: 777, bar: new Date }) )
			
			$mol_assert_equal( { foo: [ null, 0, false, '' ] }, $mol_schema_json.guard({ foo: [ null, 0, false, '' ] }) )
			$mol_assert_fail( ()=> $mol_schema_json.guard({ foo: [ new Date ] }), 'Wrong variant' )
			
		},
		
	})
}
