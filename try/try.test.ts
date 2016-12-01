namespace $ {
	$mol_test({
		
		'return result without errors'() {
			
			$mol_assert_equal( $mol_try( ()=> false ) , false )
			
		} ,
		
		//'return error if thrown'() {
		//	
		//	const error = new Error( '$mol_try test error' )
		//	$mol_assert_equal( $mol_try( ()=> { throw error } ) , error )
		//	
		//} ,
		
	})	
}
