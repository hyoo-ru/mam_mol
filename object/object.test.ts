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
		
		'object path generation'() {
			var x = new $mol_object
			
			$mol_assert_equal( `${ x }` , '' )
			
			x.object_field( 'foo()' )
			$mol_assert_equal( `${ x }` , '.foo()' )
			
			x.object_field( 'bar()' )
			$mol_assert_equal( `${ x }` , '.foo()' )
		} ,
	
	} )
}
