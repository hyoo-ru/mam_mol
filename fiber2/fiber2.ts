namespace $ {

	export class $mol_fiber2 extends $mol_wrapper {

		cursor = -1
		stack = [] as unknown[]

		get cached() {

			const result = this.stack[ this.cursor ]
					
			if( result instanceof Error || result instanceof Promise ) {
				return $mol_fail_hidden( result )
			}
			
			return result

		}
		set cached( next : unknown ) {
			this.stack[ this.cursor ] = next
		}

		tick() {
			return ++ this.cursor
		}

		shrink( cursor : number ) {
			this.cursor = cursor
			this.stack.length = cursor + 1
		}
		
		static current = null as null | $mol_fiber2

		static wrap<
			This,
			Task extends ( this : This , ... args : readonly unknown[] )=> unknown,
		>(
			task : Task
		) {
			return function( this : This , ... args : Parameters< Task > ) {

				const fiber = $mol_fiber2.current
				if( !fiber ) $mol_fail( new Error( 'Fiberized code should be executed in $mol_fiber2.run' ) )

				const cursor = fiber.tick()
				const cached = fiber.cached
				
				if( cached !== undefined ) return fiber.cached

				const result = task.call( this , ... args ) ?? null
				
				fiber.shrink( cursor )
				fiber.cached = result

				return result

			}
		}

		static wait< Result >( task : ()=> Promise< Result > ) : Result {
			
			return $mol_fiber2.run( ()=> {

				const fiber = $mol_fiber2.current
				
				const promise = task()

				promise.then( res => fiber.cached = res , err => fiber.cached = err )
				
				$mol_fail_hidden( promise )

			})

		}

		static async async<
			Result,
			Task extends ()=> Result,
		>(
			task : Task
		) {

			const next = new $mol_fiber2

			while( true ) {

				const prev = $mol_fiber2.current

				try {
					
					$mol_fiber2.current = next
					next.cursor = -1

					const result = task()

					$mol_fiber2.current = prev

					return result

				} catch( error ) {

					$mol_fiber2.current = prev
					
					if( typeof error.then !== 'function' ) {
						return $mol_fail_hidden( error )
					}
					
					try { await error } catch { }

				}

			}
		
		}

	}

}
