namespace $ {
	$mol_test({
		
		'Cached field' ($) {

			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_field
				static low = 1
				
				@ $mol_wire_field
				static get high() {
					return this.low + 1
				}
				static set high( next: number ) {
					this.low = next - 1
				}
				
				@ $mol_wire_method
				static test() {
					
					$mol_assert_equal( App.high , 2 )
		
					App.high = 3
					$mol_assert_equal( App.high , 3 )
					
				}

			}
			
			App.test()
		},

	})
}
