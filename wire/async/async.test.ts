namespace $ {

	$mol_test({
		'test types'( $ ) {
			class A {
				static a() {
					return ''
				}
				static b() {
					return $mol_wire_async(this).a()
				}
			}

			type Check = $mol_type_assert<ReturnType<typeof A['b']>, Promise<string>>
		},
		
		async 'Latest method calls wins'( $ ) {
			
			class NameLogger extends $mol_object2 {
				
				static $ = $
				
				static first = [] as string[]
				static last = [] as string[]
				
				static send( next: string ) {
					$mol_wire_sync( this.first ).push( next )
					$$.$mol_wait_timeout(0)
					this.last.push( next )
				}
				
			}
			
			const name = $mol_wire_async( NameLogger ).send
			
			name( 'john' )
			const promise = name( 'jin' )
			
			$.$mol_after_mock_warp()
			await promise
			
			$mol_assert_equal( NameLogger.first, [ 'john', 'jin' ] )
			$mol_assert_equal( NameLogger.last, [ 'jin' ] )

		},

		async 'Latest function calls wins'( $ ) {
			
			const first = [] as string[]
			const last = [] as string[]
			
			function send_name( next: string ) {
				$mol_wire_sync( first ).push( next )
				$$.$mol_wait_timeout(0)
				last.push( next )
			}
			
			const name = $mol_wire_async( send_name )
			
			name( 'john' )
			const promise = name( 'jin' )
			
			$.$mol_after_mock_warp()
			await promise
			
			$mol_assert_equal( first, [ 'john', 'jin' ] )
			$mol_assert_equal( last, [ 'jin' ] )
			
		},

	})
	
}
