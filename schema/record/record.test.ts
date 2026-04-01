namespace $.$$ {
	$mol_test({
		
		"Record schema"( $ ) {
			
			const User = $mol_schema_record({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			$mol_assert_equal( '$mol_schema_record<{"name":$mol_schema_string,"age":$mol_schema_integer}>', User + '' )
			
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123, height: 777 } ) )
			
			$mol_assert_equal( false, User.check( {} ) )
			$mol_assert_equal( false, User.check( { name: 'foo', age: 1.5 } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: 123 },
				User.cast( { name: 'foo', age: 123, height: 777 } )
			)
			$mol_assert_equal( { name: 'foo', age: 0 }, User.cast( { name: 'foo' } ) )
			
			$mol_assert_equal( { name: 'foo', age: 123 }, User.guard({ name: 'foo', age: 123 }) )
			$mol_assert_equal( { name: 'foo', age: 123, salary: 777 }, User.guard({ name: 'foo', age: 123, salary: 777 }) )
			$mol_assert_fail( ()=> User.guard( {} ), 'Wrong field' )
			$mol_assert_fail( ()=> User.guard( { name: 'foo', age: 'bar'} ), 'Wrong field' )
			
		},
		
		"Record schema composition"( $ ) {
			
			const User = $mol_schema_record({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			const Admin = $mol_schema_record({
				... User.Fields,
				space: $mol_schema_string,
			})
			
			$mol_assert_equal( false, Admin.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, Admin.check( { name: 'foo', age: 123, space: 'bar' } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: 123, space: '' },
				Admin.cast({ name: 'foo', age: 123 }),
			)
			
			$mol_assert_equal(
				{ name: 'foo', age: 123, space: 'bar' },
				Admin.guard({ name: 'foo', age: 123, space: 'bar' }),
			)
			$mol_assert_fail( ()=> Admin.guard({ name: 'foo', age: 123 }), 'Wrong field' )
			
		},
		
	})
}
