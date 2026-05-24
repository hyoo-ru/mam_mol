namespace $.$$ {
	$mol_test({
		
		"Partial Record schema"( $ ) {
			
			const User = $mol_schema_partial({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, User.check( { name: null } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: undefined },
				User.cast({ name: 'foo', age: false }),
			)
			
			$mol_assert_equal(
				{ name: 'foo', age: undefined },
				User.guard({ name: 'foo', age: undefined }),
				// User.guard({ name: 'foo' }),
			)
			$mol_assert_fail( ()=> User.guard({ name: 'foo', age: 'bar' }), 'Wrong field' )
			
		},
		
	})
}
