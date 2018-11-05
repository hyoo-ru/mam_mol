module $ {
	
	$mol_test({
		
		'Makes reactive value by key' () {

			class Fib extends $mol_object2 {

				@ $mol_atom2_field
				static get value() {

					return $mol_atom2_dict< number , number >( ( index , dict )=> {
						if( index < 2 ) return 1
						return dict[ index - 1 ] + dict[ index - 2 ]
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
					return $mol_atom2_dict< number , number >()
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
					return $mol_atom2_dict< number , number >()
				}
				
			}

			Registry.value[1] = 2
			Registry.value[3] = 4

			const keys = [] as string[]
			for( let key in Registry.value ) keys.push( key )

			$mol_assert_equal( $mol_conform( [ '1' , '3' ] , keys ) , keys )

		} ,

		'Can be iterated over pairs' () {

			class Registry extends $mol_object2 {

				@ $mol_atom2_field
				static get value() {
					return $mol_atom2_dict< number , number >()
				}
				
			}

			Registry.value[1] = 2
			Registry.value[3] = 4

			const keys = [] as [ string , number ][]
			for( const pair of Object.entries( Registry.value ) ) keys.push( pair )

			$mol_assert_equal( $mol_conform( [ [ '1' , 2 ] , [ '3' , 4 ] ] , keys ) , keys )

		} ,

	})
	
}
