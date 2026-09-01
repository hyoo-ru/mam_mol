namespace $ {
	$mol_test({
		
		'Previous value'() {

			class Cache extends $mol_object2 {

				@ $mol_wire_solo
				static store( next?: Record< string, number > ): typeof next {
					if( !next ) return {}
					return {
						... $mol_wire_probe( ()=> this.store() ) ?? {},
						... next,
					}
				}
				
			}
			
			$mol_assert_like( Cache.store(), {} )
			
			$mol_assert_like( Cache.store({ foo: 666 }), { foo: 666 } )
			$mol_assert_like( Cache.store({ bar: 777 }), { foo: 666, bar: 777 } )

		} ,
		
	})
}
