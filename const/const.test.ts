namespace $ {
	$mol_test( { 
		
		'const returns stored value'() {
		
			const foo = { bar : $mol_const( Math.random() ) }
			
			$mol_assert_equal( foo.bar() , foo.bar() )
			$mol_assert_equal( foo.bar() , foo.bar['()'] )
			
		} ,

	} )
}
