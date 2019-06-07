module $ {
	
	$mol_test({
		
		'Makes reactive value by key' () {

			class Fib extends $mol_object2 {

				@ $mol_atom2_field
				static get value() {

					return $mol_atom2_dict< number , number >({
						get : ( index , dict )=> {
							if( index < 2 ) return 1
							return dict[ index - 1 ] + dict[ index - 2 ]
						}
					} )

				}
				
			}

			$mol_assert_equal( Fib.value[10] , 89 )

			Fib.value[ 1 ] = 2
			$mol_assert_equal( Fib.value[10] , 144 )

		} ,

		'Reactive keys list' () {

			class Registry extends $mol_object2 {

				@ $mol_atom2_field
				static get value() {
					return $mol_atom2_dict< number , number >({})
				}

				@ $mol_atom2_field
				static get size() {
					return Object.keys( this.value ).length
				}
				
			}

			$mol_assert_equal( Registry.size , 0 )
			
			Registry.value[1] = 2
			Registry.value[3] = 4
			
			$mol_assert_equal( Registry.size , 2 )

		} ,

		'Can be iterated over keys' () {

			class Registry extends $mol_object2 {

				@ $mol_atom2_field
				static get value() {
					return $mol_atom2_dict< number , number >({})
				}
				
			}

			Registry.value[1] = 2
			Registry.value[3] = 4

			const keys = [] as string[]
			for( let key in Registry.value ) keys.push( key )

			$mol_assert_like( keys , [ '1' , '3' ] )

		} ,

		async 'Call back on abort' () {

			const log = [] as string[]

			class Registry extends $mol_object2 {

				@ $mol_atom2_field
				static get item() {
					return $mol_atom2_dict< string , string >({
						get : key => key ,
						abort : key => {
							log.push( key )
							return true
						} ,
					})
				}

				@ $mol_atom2_field
				static condition = true

				@ $mol_atom2_field
				static get result() { return this.condition ? this.item['foo'] : '' }

			}

			$mol_assert_equal( Registry.result , 'foo' )
			
			Registry.condition = false
			$mol_assert_equal( Registry.result , '' )

			$mol_assert_like( log , [] )

			await $mol_fiber_warp()
			$mol_assert_like( log , [ 'foo' ] )

		} ,

		'Value has js-path name' () {

			class Registry extends $mol_object2 {

				@ $mol_atom2_field
				static get item() {
					return $mol_atom2_dict({
						get : ( key : string )=> new $mol_object2 ,
					})
				}

			}

			$mol_assert_equal( `${ Registry.item['foo'] }` , 'Registry.item["foo"]' )

		} ,

	})
	
}
