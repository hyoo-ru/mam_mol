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
			
		} ,

		'unidirectional bind'() {

			class View {
				text = ''
			}

			class App {

				name = 'Jin'

				get view_text() {
					return this.name
				}

				@ $mol_bind_having({ text : 'view_text' })
				View = new View

			}

			const app = new App
			$mol_assert_equal( app.View.text , 'Jin' )

			$mol_assert_fail( ()=> app.View.text = 'John' , TypeError )
			$mol_assert_equal( app.View.text , 'Jin' )
			
			app.name = 'Jack'
			$mol_assert_equal( app.View.text , 'Jack' )
			
		} ,
		
	})

}
