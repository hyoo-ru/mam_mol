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
			
		'Context in instance inherits from class'($) {
			const custom = $.$mol_ambient({})
			class X extends $.$mol_object {
				static $ = custom
			}

			$mol_assert_equal(new X().$, custom)
		},

	} )
}
