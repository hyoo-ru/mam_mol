module $ {
	
	$mol_test( test => {
		
		const foo = { bar : $mol_const( Math.random() ) }
		
		test.equal( foo.bar() , foo.bar() )
		test.equal( foo.bar() , foo.bar['()'] )
		
	} )
	
}
