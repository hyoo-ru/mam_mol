namespace $ {
	$mol_test({
		
		'Watch one value' ($) {

			class App extends $mol_object2 {

				static $ = $
				static dict = new $mol_wire_dict< number, number >()
				
				@ $mol_wire_solo
				static lucky() {
					return this.dict.get( 777 )
				}

			}

			$mol_assert_equal( App.lucky(), undefined )

			App.dict.set( 666, 6666 )
			$mol_assert_equal( App.lucky(), undefined )

			App.dict.set( 777, 7777 )
			$mol_assert_equal( App.lucky(), 7777 )

			App.dict.delete( 777 )
			$mol_assert_equal( App.lucky(), undefined )

		},

		'Watch item channel' ($) {

			class App extends $mol_object2 {

				static $ = $
				static dict = new $mol_wire_dict< number, number >()
				
				@ $mol_wire_solo
				static lucky() {
					return this.dict.item( 777 )
				}

			}

			$mol_assert_equal( App.lucky(), null )

			App.dict.item( 666, 6666 )
			$mol_assert_equal( App.lucky(), null )

			App.dict.item( 777, 7777 )
			$mol_assert_equal( App.lucky(), 7777 )

			App.dict.item( 777, null )
			$mol_assert_equal( App.lucky(), null )

		},

		'Watch size' ($) {

			class App extends $mol_object2 {

				static $ = $
				static dict = new $mol_wire_dict< number, number >()
				
				@ $mol_wire_solo
				static size() {
					return this.dict.size
				}

			}

			$mol_assert_equal( App.size(), 0 )

			App.dict.set( 666, 6666 )
			$mol_assert_equal( App.size(), 1 )

			App.dict.set( 777, 7777 )
			$mol_assert_equal( App.size(), 2 )

			App.dict.delete( 777 )
			$mol_assert_equal( App.size(), 1 )

		},

		'Watch for-of' ($) {

			class App extends $mol_object2 {

				static $ = $
				static dict = new $mol_wire_dict< number, number >()
				
				@ $mol_wire_solo
				static sum() {
					let keys = 0
					let vals = 0
					for( const [ key, val ] of this.dict ) {
						keys += key
						vals += val
					}
					return [ keys, vals ]
				}

			}

			$mol_assert_like( App.sum(), [ 0, 0 ] )

			App.dict.set( 111, 1111 )
			$mol_assert_like( App.sum(), [ 111, 1111 ] )

			App.dict.set( 222, 2222 )
			$mol_assert_like( App.sum(), [ 333, 3333 ] )

			App.dict.delete( 111 )
			$mol_assert_like( App.sum(), [ 222, 2222 ] )

		},

		'Watch forEach' ($) {

			class App extends $mol_object2 {

				static $ = $
				static dict = new $mol_wire_dict< number, number >()
				
				@ $mol_wire_solo
				static sum() {
					let keys = 0
					let vals = 0
					this.dict.forEach( ( val, key )=> {
						keys += key
						vals += val
					} )
					return [ keys, vals ]
				}

			}

			$mol_assert_like( App.sum(), [ 0, 0 ] )

			App.dict.set( 111, 1111 )
			$mol_assert_like( App.sum(), [ 111, 1111 ] )

			App.dict.set( 222, 2222 )
			$mol_assert_like( App.sum(), [ 333, 3333 ] )

			App.dict.delete( 111 )
			$mol_assert_like( App.sum(), [ 222, 2222 ] )
			
		},

	})
}
