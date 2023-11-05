namespace $ {
	$mol_test({
		
		async 'Error caching' ($) {
			const next_cached = 123

			class Some extends $mol_object2 {

				static $ = $

				@ $mol_wire_plex
				static data( id: string, next?: unknown): unknown {
					if (next) return next as never

					setTimeout(() => {
						$mol_wire_async(this).data(id, next_cached)
					}, 10)

					$mol_fail_hidden(new Promise(() => {}))
				}

				@ $mol_wire_method
				static run() {
					return this.data('1')
				}

			}

			const val = await $mol_wire_async(Some).run()
			$mol_assert_equal(val, next_cached)
		} ,

		'Memoize by single simple key' ($) {

			class Team extends $mol_object2 {

				static $ = $

				@ $mol_wire_plex
				static user_name( user: string , next?: string ) {
					return next ?? user
				}

				@ $mol_wire_solo
				static user_names() {
					return [
						this.user_name( 'jin' ),
						this.user_name( 'john' ),
					]
				}

			}
			
			$mol_assert_like( Team.user_names(), [ 'jin', 'john' ] )
			
			Team.user_name( 'jin', 'JIN' )
			$mol_assert_like( Team.user_names(), [ 'JIN', 'john' ] )

		} ,

		'Memoize by single complex key' ($) {

			class Map extends $mol_object2 {

				static $ = $

				@ $mol_wire_plex
				static tile( pos: [ number, number ] ) {
					return new String( `/tile=${pos}` )
				}

				@ $mol_wire_method
				static test() {
					
					$mol_assert_like( this.tile([0,1]), new String( '/tile=0,1' ) )
					$mol_assert_equal( this.tile([0,1]), this.tile([0,1]) )
					
				}
				
			}

			Map.test()
		} ,

		'Owned value has js-path name' () {

			class App extends $mol_object2 {

				@ $mol_wire_plex
				static like( friend: number ) {
					return new $mol_object2
				}

				@ $mol_wire_plex
				static relation( [ friend, props ]: [ number, [ number ] ] ) {
					return new $mol_object2
				}

			}

			$mol_assert_equal( `${ App.like(123) }` , 'App.like(123)' )
			$mol_assert_equal( `${ App.relation([123,[456]]) }` , 'App.relation([123,[456]])' )

		} ,

		'Deep deps' ($) {

			class Fib extends $mol_object2 {

				static $ = $
				
				static sums = 0

				@ $mol_wire_plex
				static value( index: number , next?: number ): number {
					if( next ) return next
					if( index < 2 ) return 1
					++ this.sums
					return this.value( index - 1 ) + this.value( index - 2 )
				}
				
			}
			
			$mol_assert_equal( Fib.value( 4 ), 5 )
			$mol_assert_equal( Fib.sums, 3 )
			
			Fib.value( 1, 2 )
			$mol_assert_equal( Fib.value( 4 ), 8 )
			$mol_assert_equal( Fib.sums, 6 )

		} ,

	})
}
