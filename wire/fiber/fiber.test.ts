namespace $ {

	$mol_test({
		
		'Sync execution'() {

			class Sync extends $mol_object2 {
				
				@ $mol_wire_method
				static calc( a: number, b: number ) {
					return a + b
				}
				
			}
			
			$mol_assert_equal( Sync.calc( 1, 2 ), 3 )
			
		},

		async 'async <=> sync'() {
			
			class SyncAsync extends $mol_object2 {
				
				static async val( a: number ) {
					return a
				}
				
				static sum( a: number, b: number ) {
					const syn = $mol_wire_sync( this )
					return syn.val( a ) + syn.val( b )
				}
				
				static async calc( a: number, b: number ) {
					return 5 + await $mol_wire_async( this ).sum( a, b )
				}
				
			}
			
			$mol_assert_equal( await SyncAsync.calc( 1, 2 ), 8 )

		},

		async 'Idempotence control'() {

			class Idempotence extends $mol_object2 {
				
				static logs_idemp = 0
				static logs_unidemp = 0
				
				@ $mol_wire_method
				static log_idemp() {
					this.logs_idemp += 1
				}
				
				static log_unidemp() {
					this.logs_unidemp += 1
				}
				
				static async val( a: number ) {
					return a
				}
				
				static sum( a: number, b: number ) {
					this.log_idemp()
					this.log_unidemp()
					const syn = $mol_wire_sync( this )
					return syn.val( a ) + syn.val( b )
				}
				
				static async calc( a: number, b: number ) {
					return 5 + await $mol_wire_async( this ).sum( a, b )
				}
				
			}
			
			$mol_assert_equal( await Idempotence.calc( 1, 2 ), 8 )
			$mol_assert_equal( Idempotence.logs_idemp, 1 )
			$mol_assert_equal( Idempotence.logs_unidemp, 3 )

		},

		async 'Error handling'() {
			
			class Handle extends $mol_object2 {
				
				static async sum( a: number, b: number ){
					$mol_fail( new Error( 'test error ' + ( a + b ) ) )
				}
				
				static check() {
					try {
						return $mol_wire_sync( Handle ).sum( 1, 2 )
					} catch( error: any ) {
						if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
						$mol_assert_equal( error.message, 'test error 3' )
					}
				}
				
			}
				
			await $mol_wire_async( Handle ).check()
			
		},
		
	})
	
}
