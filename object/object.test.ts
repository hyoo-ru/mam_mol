namespace $ {
	$mol_test( {
		
		'init with overload'() {
			class X extends $mol_object {
				foo() {
					return 1
				}
			}
			
			var x = X.make({
				foo : ()=> 2 ,
			})
			
			$mol_assert_equal( x.foo() , 2 )
		} ,
			
	} )
}
