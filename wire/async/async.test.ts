namespace $ {

	$mol_test({
		
		async 'Latest Calls Wins on Concurrency'( $ ) {
			
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

		async 'Wrap function'( $ ) {
			
			const name = $mol_wire_async( function( name: string ) {
				$.$mol_wait_timeout(0)
				return name
			} )
			
			const promise = name( 'jin' )
			
			$.$mol_after_mock_warp()
			
			$mol_assert_like( await promise, 'jin' )
			
		},

	})
	
}
