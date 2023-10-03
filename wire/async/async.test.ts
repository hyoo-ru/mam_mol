namespace $ {

	$mol_test({

		'test types'( $ ) {
			class A {
				a() {
					return ''
				}
				b() {
					return $mol_wire_async(this).a()
				}
			}
		
			const a = new A()
			const b = a.b()
			type Check = $mol_type_assert<typeof b, Promise<string>>
		},
		
		async 'Latest method calls wins'( $ ) {
			
			class NameLogger extends $mol_object2 {
				
				static $ = $
				
				static first = [] as string[]
				static last = [] as string[]
				
				static send( next: string ) {
					$mol_wire_sync( this.first ).push( next )
					this.$.$mol_wait_timeout(0)
					this.last.push( next )
				}
				
			}
			
			const name = $mol_wire_async( NameLogger ).send
			
			name( 'john' )
			const promise = name( 'jin' )
			
			$.$mol_after_mock_warp()
			await promise
			
			$mol_assert_like( NameLogger.first, [ 'john', 'jin' ] )
			$mol_assert_like( NameLogger.last, [ 'jin' ] )

		},

		async 'Latest function calls wins'( $ ) {
			
			const first = [] as string[]
			const last = [] as string[]
			
			function send_name( next: string ) {
				$mol_wire_sync( first ).push( next )
				$.$mol_wait_timeout(0)
				last.push( next )
			}
			
			const name = $mol_wire_async( send_name )
			
			name( 'john' )
			const promise = name( 'jin' )
			
			$.$mol_after_mock_warp()
			await promise
			
			$mol_assert_like( first, [ 'john', 'jin' ] )
			$mol_assert_like( last, [ 'jin' ] )
			
		},

	})
	
}
