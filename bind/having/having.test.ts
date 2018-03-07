namespace $ {

	$mol_test({

		'bidirectional bind'() {

			class Input {
				value = ''
			}

			class App {

				name = 'Jin'

				@ $mol_bind_having({ value : 'name' })
				Input = new Input

			}

			const app = new App
			$mol_assert_equal( app.Input.value , 'Jin' )

			app.name = 'John'
			$mol_assert_equal( app.Input.value , 'John' )
			
			app.Input.value = 'Jack'
			$mol_assert_equal( app.name , 'Jack' )
			
		}
		
	})

}
