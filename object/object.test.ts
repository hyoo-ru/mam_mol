namespace $ {
	$mol_test( {
		
		'init with overload'() {
			class X extends $mol_object {
				foo() {
					return 1
				}
			}
			
			var x = new X().setup(
				obj => {
					obj.foo = () => 2
				}
			)
			
			$mol_assert_equal( x.foo() , 2 )
		} ,
		
		'object path generation'() {
			var x = new $mol_object
			
			$mol_assert_equal( `${ x }` , '' )
			
			x.objectField( 'foo()' )
			$mol_assert_equal( `${ x }` , '.foo()' )
			
			x.objectField( 'bar()' )
			$mol_assert_equal( `${ x }` , '.foo()' )
		} ,
	
	} )
}
