namespace $ {
	$mol_test({
		
		// https://github.com/nin-jin/slides/tree/master/reactivity#component-states
		'Cached channel' ($) {

			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static value( next = 1 ) {
					return next + 1
				}
				
			}
			
			$mol_assert_equal( App.value(), 2 )

			App.value( 2 )
			$mol_assert_equal( App.value(), 3 )

		},

		'Read Pushed' ($) {

			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static value( next = 0 ) {
					return next
				}
				
			}
			
			$mol_assert_equal( App.value( 1 ), 1 )
			$mol_assert_equal( App.value(), 1 )

		},

		'Mem overrides mem' ($) {

			class Base extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static value( next = 1 ) {
					return next + 1
				}
				
			}
			
			class Middle extends Base {
				
				@ $mol_wire_solo
				static value( next?: number ) {
					return super.value( next ) + 1
				}
			
			}
				
			class App extends Middle {
				
				@ $mol_wire_solo
				static value( next?: number ) {
					return super.value( next ) * 3
				}
				
			}
			
			$mol_assert_equal( App.value(), 9 )
			
			$mol_assert_equal( App.value( 5 ), 21 )
			$mol_assert_equal( App.value(), 21 )

		},

		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-consistency
		'Auto recalculation of cached values'( $ ) {
			
			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static xxx( next? : number ) {
					return next || 1
				}

				@ $mol_wire_solo
				static yyy() {
					return this.xxx() + 1
				}

				@ $mol_wire_solo
				static zzz() {
					return this.yyy() + 1
				}

			}
			
			$mol_assert_equal( App.yyy(), 2 )
			$mol_assert_equal( App.zzz(), 3 )

			App.xxx( 5 )
			$mol_assert_equal( App.zzz(), 7 )

		},

		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-reasonability
		'Skip recalculation when actually no dependency changes'( $ ) {
			
			const log = [] as string[]
			
			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static xxx( next? : number ) {
					log.push( 'xxx' )
					return next || 1
				}
				
				@ $mol_wire_solo
				static yyy() {
					log.push( 'yyy' )
					return [ Math.sign( this.xxx() ) ]
				}
				
				@ $mol_wire_solo
				static zzz() {
					log.push( 'zzz' )
					return this.yyy()[0] + 1
				}

			}
			
			App.zzz()
			$mol_assert_like( log, [ 'zzz', 'yyy', 'xxx' ] )
			
			App.xxx( 5 )
			$mol_assert_like( log, [ 'zzz', 'yyy', 'xxx', 'xxx' ] )
			
			App.zzz()
			$mol_assert_like( log, [ 'zzz', 'yyy', 'xxx', 'xxx', 'yyy' ] )

		},

		// https://github.com/nin-jin/slides/tree/master/reactivity#flow-auto
		'Flow: Auto'( $ ) {

			class App extends $mol_object2 {
				
				static get $() { return $ }

				@ $mol_wire_solo
				static source( next = 1 ) { return next }
				
				@ $mol_wire_solo
				static condition( next = true ) { return next }
				
				static counter = 0

				@ $mol_wire_solo
				static result() {
					const res = this.condition() ? this.source() : 0
					return res + this.counter ++
				}
				
			}

			$mol_assert_equal( App.result() , 1 )
			$mol_assert_equal( App.counter , 1 )
			
			App.source( 10 )
			$mol_assert_equal( App.result() , 11 )
			$mol_assert_equal( App.counter , 2 )
			
			App.condition( false )
			$mol_assert_equal( App.result() , 2 )
			$mol_assert_equal( App.counter , 3 )

			$mol_wire_fiber.sync()
			$mol_assert_equal( App.source() , 1 )
			
			App.source( 20 )
			$mol_assert_equal( App.result() , 2 )
			$mol_assert_equal( App.counter , 3 )

			App.condition( true )
			$mol_assert_equal( App.result() , 23 )
			$mol_assert_equal( App.counter , 4 )

		} ,

		// https://github.com/nin-jin/slides/tree/master/reactivity#dupes-equality
		'Dupes: Equality'( $ ) {
			
			let counter = 0
			
			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static foo( next? : { numbs: number[] } ) {
					return next ?? { numbs: [ 1 ] }
				}

				@ $mol_wire_solo
				static bar() {
					return { ... this.foo(), count: ++ counter }
				}

			}
			
			$mol_assert_like( App.bar(), { numbs: [ 1 ], count: 1 } )

			App.foo({ numbs: [ 1 ] })
			$mol_assert_like( App.bar(), { numbs: [ 1 ], count: 1 } )
			
			App.foo({ numbs: [ 2 ] })
			$mol_assert_like( App.bar(), { numbs: [ 2 ], count: 2 } )

		},

		// https://github.com/nin-jin/slides/tree/master/reactivity#cycle-fail
		'Cycle: Fail'( $ ) {
		
			class App extends $mol_object2 {
		
				static $ = $
				
				@ $mol_wire_solo
				static foo() : number {
					return this.bar() + 1
				}
		
				@ $mol_wire_solo
				static bar() : number {
					return this.foo() + 1
				}
		
				@ $mol_wire_method
				static test() {
					$mol_assert_fail( ()=> App.foo(), 'Circular subscription' )
				}	
				
			}
			
			App.test()
		} ,

		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
		// 'Update deps on push'( $ ) {
		
		// 	class App extends $mol_object2 {
		
		// 		static $ = $
				
		// 		@ $mol_wire_solo
		// 		static left( next = false ) {
		// 			return next
		// 		}
		
		// 		@ $mol_wire_solo
		// 		static right( next = false ) {
		// 			return next
		// 		}
		
		// 		@ $mol_wire_solo
		// 		static res( next?: boolean ) {
		// 			return this.left( next ) && this.right()
		// 		}
		
		// 	}
			
		// 	$mol_assert_equal( App.res(), false )
		// 	$mol_assert_equal( App.res( true ), false )
			
		// 	$mol_assert_equal( App.right( true ), true )
		// 	$mol_assert_equal( App.res(), true )
			
		// } ,
		
		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
		'Different order of pull and push'( $ ) {
		
			class App extends $mol_object2 {
		
				static $ = $
				
				@ $mol_wire_solo
				static store( next = 0 ) {
					return next
				}
		
				@ $mol_wire_solo
				static fast( next?: number ) {
					return this.store( next )
				}
		
				@ $mol_wire_solo
				static slow( next?: number ) {
					if( next !== undefined ) this.slow() // enforce pull before push
					return this.store( next )
				}
		
			}
			
			App.fast()
			$mol_assert_equal( App.slow( 666 ), 666 )
			$mol_assert_equal( App.fast(), App.slow(), 666 )
			
			App.store( 777 )
			$mol_assert_equal( App.fast(), App.slow(), 777 )
			
		} ,
		
		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
		'Actions inside invariant'( $ ) {
		
			class App extends $mol_object2 {
		
				static $ = $
				
				@ $mol_wire_solo
				static count( next = 0 ) {
					return next
				}
		
				@ $mol_wire_solo
				static count2() {
					return this.count()
				}
		
				@ $mol_wire_solo
				static res() {
					const count = this.count2()
					if( !count ) this.count( count + 1 )
					return count + 1
				}
		
			}
			
			$mol_assert_like( App.res(), 1 )
			
			App.count( 5 )
			$mol_assert_like( App.res(), 6 )

		} ,
		
		async 'Toggle with async'( $ ) {
		
			class App extends $mol_object2 {
		
				static $ = $
				
				@ $mol_wire_solo
				static checked( next = false ) {
					$$.$mol_wait_timeout(0)
					return next
				}
				
				@ $mol_wire_method
				static toggle() {
					const prev = this.checked()
					$mol_assert_unique( this.checked( !prev ), prev )
					// $mol_assert_equal( this.checked() , prev )
				}
		
				@ $mol_wire_solo
				static res() {
					return this.checked()
				}
				
				@ $mol_wire_method
				static test() {
					
					$mol_assert_equal( App.res(), false )
					
					App.toggle()
					$mol_assert_equal( App.res(), true )
					
				}
		
			}
			
			await $mol_wire_async( App ).test()
			
		} ,

		// // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
		// 'Stable order of multiple root'( $ ) {
		
		// 	class App extends $mol_object2 {
		
		// 		static $ = $
				
		// 		static counter = 0
				
		// 		@ $mol_wire_solo
		// 		static left_trigger( next = 0 ) {
		// 			return next
		// 		}
		
		// 		@ $mol_wire_solo
		// 		static left_root() {
		// 			this.left_trigger()
		// 			return ++ this.counter
		// 		}
				
		// 		@ $mol_wire_solo
		// 		static right_trigger( next = 0 ) {
		// 			return next
		// 		}
				
		// 		@ $mol_wire_solo
		// 		static right_root() {
		// 			this.right_trigger()
		// 			return ++ this.counter
		// 		}
		
		// 	}
			
		// 	$mol_assert_equal( App.left_root(), 1 )
		// 	$mol_assert_equal( App.right_root(), 2 )
			
		// 	App.right_trigger( 1 )
		// 	App.left_trigger( 1 )
			
		// 	$mol_wire_fiber.sync()
			
		// 	$mol_assert_equal( App.right_root(), 4 )
		// 	$mol_assert_equal( App.left_root(), 3 )

		// } ,

		// https://github.com/nin-jin/slides/tree/master/reactivity#error-store
		'Restore after error'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_wire_solo
				static condition( next = false ) { return next }

				@ $mol_wire_solo
				static broken() {
					
					if( this.condition() ) {
						$mol_fail( new Error( 'test error' ) )
					}
					
					return 1
				}
				
				@ $mol_wire_solo
				static result() {
					return this.broken()
				}
				
			}

			$mol_assert_equal( App.result() , 1 )
			
			App.condition( true )
			$mol_assert_fail( ()=> App.result(), 'test error' )
			
			App.condition( false )
			$mol_assert_equal( App.result() , 1 )

		} ,
	
		async 'Wait for data'($) {

			class App extends $mol_object2 {

				static $ = $
				
				static async source() {
					return 'Jin'
				}

				@ $mol_wire_solo
				static middle() {
					return $mol_wire_sync( this ).source()
				}

				@ $mol_wire_solo
				static target() {
					return this.middle()
				}
				
				@ $mol_wire_method
				static test() {
					$mol_assert_equal( App.target() , 'Jin' )
				}

			}

			await $mol_wire_async( App ).test()
		},

		'Auto destroy on long alone'( $ ) {

			let destroyed = false

			class App extends $mol_object2 {

				static $ = $
				
				@ $mol_wire_solo
				static showing( next = true ) {
					return next
				}

				@ $mol_wire_solo
				static details() {
					return {
						destructor() {
							destroyed = true
						}
					}
				}

				@ $mol_wire_solo
				static render() {
					return this.showing() ? this.details() : null
				}

			}

			const details = App.render()
			$mol_assert_ok( details )

			App.showing( false )
			$mol_assert_not( App.render() )
			
			App.showing( true )
			$mol_assert_equal( App.render() , details )
			
			$mol_wire_fiber.sync()
			$mol_assert_not( destroyed )
			
			App.showing( false )
			$mol_wire_fiber.sync()
			$mol_assert_ok( destroyed )

			App.showing( true )
			$mol_assert_unique( App.render() , details )
			
		},

		// https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
		async 'Hold pubs while wait async task'($) {

			class App extends $mol_object2 {

				static $ = $
				
				static counter = 0
				
				@ $mol_wire_solo
				static resets( next?: null ): number {
					return ( $mol_wire_probe( ()=> this.resets() ) ?? -1 ) + 1
				}
				
				static async wait() { }
				
				@ $mol_wire_solo
				static value() {
					return ++ this.counter
				}
				
				@ $mol_wire_solo
				static result() {
					if( this.resets() ) $mol_wire_sync( this ).wait()
					return this.value()
				}

				@ $mol_wire_method
				static test() {
				}
				
			}
			
			$mol_assert_equal( App.result() , 1 )
			
			App.resets( null )
			$mol_wire_fiber.sync()
			$mol_assert_equal( await $mol_wire_async( App ).result() , 1 )
			
		},

		'Owned value has js-path name' () {

			class App extends $mol_object2 {

				@ $mol_wire_solo
				static title() {
					return new $mol_object2
				}

			}

			$mol_assert_equal( `${ App.title() }` , 'App.title<>' )

		} ,

		'Unsubscribe from temp pubs on complete' ($) {

			class Random extends $mol_object2 {

				static $ = $

				@ $mol_wire_method
				static seed() {
					return Math.random()
				}
				
				@ $mol_wire_solo
				static resets( next?: null ) {
					return Math.random()
				}
				
				@ $mol_wire_solo
				static value() {
					this.resets()
					return this.seed()
				}

			}
			
			const first = Random.value()
			
			Random.resets( null )
			$mol_assert_unique( Random.value(), first )

		} ,

	})
}
