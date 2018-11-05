namespace $ {

	export function $mol_fiber_defer< Result = void >( calculate : ()=> Result ) {
		
		const fiber = new $mol_fiber
		
		fiber.calculate = calculate
		fiber[ Symbol.toStringTag ] = calculate.name
		
		fiber.schedule()
		
		return fiber
	}

	export function $mol_fiber_func< Calculate extends ( ... args : any[] )=> Result , Result = void >( calculate : Calculate ) {
		
		const wrapper = function $mol_fiber_func_wrapper( ... args : any[] ) {
			
			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master ) {
				master = new $mol_fiber
				master.calculate = calculate.bind( this , ... args )
				master[ Symbol.toStringTag ] = `${ slave }|${ calculate.name }#${ slave.cursor / 2 }`
			}

			return master.get()

		} as Calculate

		wrapper[ Symbol.toStringTag ] = calculate.name

		return wrapper

	}

	export function $mol_fiber_method< Host , Result >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( ... args : any[] )=> Result >
	) {

		const calculate = descr.value
		
		descr.value = function $mol_fiber_action_wrapper( ... args : any[] ) {

			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master ) {
				master = new $mol_fiber
				master.calculate = calculate.bind( this , ... args )
				master[ Symbol.toStringTag ] = `${ this }.${ name }()`
			}
			
			return master.get()

		}

	}

	export function $mol_fiber_sync< Args extends any[] , Result = void >(
		request : ( ... args : Args )=> PromiseLike< Result >
	) : ( ... args : Args )=> Result {

		return function $mol_fiber_sync_wrapper( ... args : Args ) {

			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master ) {
				master = $mol_fiber.make( fiber => {
					fiber.cursor = Number.NaN
					fiber.error = ( request.call( this , ... args ) as PromiseLike< Result > ).then(
						res => fiber.done( res ) ,
						err => fiber.fail( err ) ,
					)
					fiber[ Symbol.toStringTag ] = `${ slave }|${ request.name }#${ slave.cursor / 2 }`
				} )
			}

			return master.get()

		}

	}

	// export function $mol_fiber_async< Result = void >(
	// 	request : (
	// 		back : (
	// 			response :  ( ... args : any[] )=> Result
	// 		)=> ( ... args : any[] )=> void
	// 	)=> { (): any } | void
	// ) : Result {

	// 	const fiber = $mol_fiber_make< Result >( $mol_func_name_from( ()=> {
			
	// 		const promise = new Promise( ( done , fail )=> {

	// 			fiber.abort = request( response => ( ... args : any[] )=> {
			
	// 				if( !fiber.masters ) return
		
	// 				new Promise( ()=> {
	// 					fiber.done( response( ... args ) )
	// 				} ).catch( error => {
	// 					fiber.fail( error )
	// 				} )

	// 				// if( fiber.slave ) fiber.slave.start()
		
	// 			} )

	// 		} )

	// 		return $mol_fail_hidden( promise )

	// 	} , request ) )

	// 	return fiber.start()

	// }

	export async function $mol_fiber_warp() {
		while( $mol_fiber.queue.length ) await $mol_fiber.tick()
		return Promise.resolve()
	}

	export function $mol_fiber_fence( func : ()=> any ) {
		const prev = $mol_fiber.current
		try {
			$mol_fiber.current = null
			func()
		} finally {
			$mol_fiber.current = prev
		}
	}

	export class $mol_fiber< Result = any > extends $mol_object2 {

		static quant = 8
		static deadline = Date.now() + $mol_fiber.quant

		static current : $mol_fiber
		
		static scheduled = 0
		static queue = [] as ( ()=> PromiseLike< any > )[]
		
		
		static async tick() {

			$mol_fiber.deadline = Math.max( $mol_fiber.deadline , Date.now() + $mol_fiber.quant )
	
			while( $mol_fiber.queue.length > 0 ) {

				if( Date.now() > $mol_fiber.deadline ) return $mol_fiber.schedule()

				const task = $mol_fiber.queue.shift()
				await task()

			}
			
		}

		static schedule() {

			if( !$mol_fiber.scheduled ) {

				const schedule = this.$.requestAnimationFrame || this.$.setTimeout

				$mol_fiber.scheduled = schedule( ()=> {
					$mol_fiber.scheduled = 0
					$mol_fiber.tick()
				} )

			}

			const promise : Promise< any > = new this.$.Promise( done => this.queue.push( ()=> ( done() , promise ) ) )
			return promise

		}

		calculate : ()=> Result
		abort : void | ( ()=> void )
		
		masters = [] as ( $mol_fiber | number | undefined )[]
		cursor = 0

		error = null as Error | PromiseLike< Result >
		result = undefined as Result

		schedule() {
			$mol_fiber.schedule().then( this.get.bind( this ) )
		}

		done( result : Result ) {
			
			result = $mol_conform( result , this.result )
			
			if( this.result !== result ) {

				this.forget()

				if( $mol_owning_catch( this , result ) ) {
					result[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
				}
				
				this.$.$mol_log( this , result , '🠈' , this.result  )
				
				this.obsolete_slaves()
				
			} else {
				this.$.$mol_log( this , '✔' , result )
				if( this.error ) this.obsolete_slaves()
			}
			
			
			this.error = null
			this.result = result
			
			this.complete()

			return result
		}

		fail( error : Error ) : Error {
			
			this.complete()	
			
			this.error = error
			
			this.$.$mol_log( this , '🔥' , error.message )

			this.obsolete_slaves()

			return error
		}

		wait( promise : PromiseLike< Result > ) : PromiseLike< Result > {
			this.error = promise
			this.$.$mol_log( this , '💤' )
			this.cursor = 0
			return promise
		}

		complete() {

			if( Number.isNaN( this.cursor ) ) return

			for( let index = 0 ; index < this.masters.length ; index += 2  ) {
				this.complete_master( index )
			}
			
			this.cursor = Number.NaN

			return false
		}
		
		complete_master( index : number ) {
			this.disobey( index )
		}

		get() {

			if( this.cursor > 0 ) {
				throw new Error( 'Cyclic dependency' )
			}
			
			const slave = $mol_fiber.current
			if( slave ) slave.master = this
			
			if( Number.isNaN( this.cursor ) ) {
				if( this.error ) $mol_fail_hidden( this.error )
				return this.result
			}

			try {
				
				this.error = undefined
				
				this.limit()
				
				$mol_fiber.current = this

				this.$.$mol_log( this , '▷' )

				const result = this.done( this.calculate() )
				
				return result

			} catch( error ) {

				if( 'then' in error ) {

					error = this.wait( error )

					if( !slave ) {
						const listener = ()=> {
							this.$.$mol_log( this , '⏰' )
							this.get()
						}
						error = error.then( listener , listener )		
					}

				} else {
					error = this.fail( error )
				}

				$mol_fail_hidden( error )
			
			} finally {
				$mol_fiber.current = slave
			}

		}

		limit() {

			const now = Date.now()
			if( now <= $mol_fiber.deadline ) return

			if( !$mol_fiber.current && $mol_fiber.queue.length === 0 ) {
				$mol_fiber.deadline = now + $mol_fiber.quant
				return
			}

			$mol_fail_hidden( $mol_fiber.schedule() )
		}

		get master() {
			return this.masters[ this.cursor ] as $mol_fiber
		}
		set master( next : $mol_fiber ) {
			
			const cursor = this.cursor
			const prev = this.masters[ this.cursor ]
			
			if( prev !== next ) {
				if( prev ) this.rescue( prev as $mol_fiber , cursor )
				this.masters[ cursor ] = next
				this.masters[ cursor + 1 ] = this.obey( next , cursor )
			}
			
			this.cursor = cursor + 2
		}

		rescue( master : $mol_fiber , index : number ) {}

		obey( master : $mol_fiber , index : number ) { return Number.NaN }
		lead( slave : $mol_fiber , index : number ) { return Number.NaN }

		dislead( index : number ) {
			this.destructor()
		}

		disobey( index : number ) {
			
			const master = this.masters[ index ] as $mol_fiber
			if( !master ) return

			master.dislead( this.masters[ index + 1 ] as number )
			
			this.masters[ index ] = undefined
			this.masters[ index + 1 ] = undefined

		}

		obsolete_slaves() { }

		obsolete( index : number ) { }

		forget() {
			if( $mol_owning_check( this , this.result ) ) {
				this.result.destructor()
			}
			this.result = undefined
		}

		destructor() {
			this.$.$mol_log( this , '🕱' )
			this.cursor = 0
			this.complete()
			this.forget()
			if( this.abort ) this.abort()
		}

	}

}
