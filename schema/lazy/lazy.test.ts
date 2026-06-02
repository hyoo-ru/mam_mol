namespace $.$$ {
	$mol_test({
		
		"Integers as recursive Sets"( $ ) {
			
			type Int = Int[]
			
			class Schema extends $mol_schema_lazy<Int>(
				()=> $mol_schema_list( Schema )
			) {}
			
			type Value_is_Int = $mol_type_assert< typeof Schema.default, Int >
			
			$mol_assert_equal( Schema.default, [] )
			
			$mol_assert_equal( Schema.check([]), true )
			$mol_assert_equal( Schema.check(''), false )
			
			$mol_assert_equal( Schema.guard([]), [] )
			$mol_assert_fail( ()=> Schema.guard(''), 'Non array' )
			
			$mol_assert_equal( Schema.cast([]), [] )
			$mol_assert_equal( Schema.cast(''), [] )
			
		},
		
	})
}
