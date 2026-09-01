namespace $ {
	$mol_test({
		
		'Watch one value' ($) {

			class App extends $mol_object2 {

				static $ = $
				static set = new $mol_wire_set< number >()
				
				@ $mol_wire_solo
				static lucky() {
					return this.set.has( 777 )
				}

			}

			$mol_assert_equal( App.lucky(), false )

			App.set.add( 666 )
			$mol_assert_equal( App.lucky(), false )

			App.set.add( 777 )
			$mol_assert_equal( App.lucky(), true )

			App.set.delete( 777 )
			$mol_assert_equal( App.lucky(), false )

		},

		'Watch item channel' ($) {

			class App extends $mol_object2 {

				static $ = $
				static set = new $mol_wire_set< number >()
				
				@ $mol_wire_solo
				static lucky() {
					return this.set.item( 777 )
				}

			}

			$mol_assert_equal( App.lucky(), false )

			App.set.item( 666, true )
			$mol_assert_equal( App.lucky(), false )

			App.set.item( 777, true )
			$mol_assert_equal( App.lucky(), true )

			App.set.item( 777, false )
			$mol_assert_equal( App.lucky(), false )

		},

		'Watch size' ($) {

			class App extends $mol_object2 {

				static $ = $
				static set = new $mol_wire_set< number >()
				
				@ $mol_wire_solo
				static size() {
					return this.set.size
				}

			}

			$mol_assert_equal( App.size(), 0 )

			App.set.add( 666 )
			$mol_assert_equal( App.size(), 1 )

			App.set.add( 777 )
			$mol_assert_equal( App.size(), 2 )

			App.set.delete( 777 )
			$mol_assert_equal( App.size(), 1 )

		},

		'Watch for-of' ($) {

			class App extends $mol_object2 {

				static $ = $
				static set = new $mol_wire_set< number >()
				
				@ $mol_wire_solo
				static sum() {
					let res = 0
					for( const val of this.set ) {
						res += val
					}
					return res
				}

			}

			$mol_assert_equal( App.sum(), 0 )

			App.set.add( 111 )
			$mol_assert_equal( App.sum(), 111 )

			App.set.add( 222 )
			$mol_assert_equal( App.sum(), 333 )

			App.set.delete( 111 )
			$mol_assert_equal( App.sum(), 222 )

		},

		'Watch forEach' ($) {

			class App extends $mol_object2 {

				static $ = $
				static set = new $mol_wire_set< number >()
				
				@ $mol_wire_solo
				static sum() {
					let res = 0
					this.set.forEach( val => res += val )
					return res
				}

			}

			$mol_assert_equal( App.sum(), 0 )

			App.set.add( 111 )
			$mol_assert_equal( App.sum(), 111 )

			App.set.add( 222 )
			$mol_assert_equal( App.sum(), 333 )

			App.set.delete( 111 )
			$mol_assert_equal( App.sum(), 222 )
			
		},

	})
}
