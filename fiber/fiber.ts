namespace $ {

	export let $mol_fiber_stack = [] as $mol_fiber[]

	export function $mol_fiber_make< Result = void >( handler : ()=> Result , abort? : void | ( ()=> void ) ) {
		if( $mol_fiber.current ) $mol_fiber.current.step()

		let master = $mol_fiber.current && $mol_fiber.current.master as $mol_fiber< Result >
		if( master ) return master 
		
		const id = `${ $mol_fiber.current || '$mol_fiber' }/${ $mol_fiber.current ? $mol_fiber.current.cursor : '' }:${ $mol_func_name( handler ) }`
		return new $mol_fiber< Result >( id , $mol_fiber.current , handler , abort )
	}
	
	export function $mol_fiber_start< Result = void >( handler : ()=> Result ) {
		return $mol_fiber_make( handler ).start()
	}

	export function $mol_fiber_defer< Result = void >( handler : ()=> Result ) {
		const fiber = $mol_fiber_make( handler )
		fiber.schedule().then( fiber.start.bind( fiber ) )
	}

	export function $mol_fiber_func< Handler extends ( ... args : any[] )=> Result , Result = void >( handler : Handler ) {
		return function $mol_fiber_func_wrapper( ... args : any[] ) {
			return $mol_fiber_make( $mol_func_name_from( handler.bind( this , ... args ) as ()=> Result , handler ) ).start()
		} as Handler
	}

	export function $mol_fiber_method< Host , Result >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( ... args : any[] )=> Result >
	) {
		const value = descr.value
		descr.value = function $mol_fiber_method_wrapper( ... args : any[] ) {
			const handler = value.bind( this , ... args ) as ()=> Result
			handler[ Symbol.toStringTag ] = `${ this }.${ name }()`
			return $mol_fiber_start( handler )
		}
	}

	export function $mol_fiber_sync< Args extends any[] , Result = void >(
		request : ( ... args : Args )=> PromiseLike< Result >
	) : ( ... args : Args )=> Result {

		return function $mol_fiber_sync_wrapper( ... args : Args ) {

			const fiber = $mol_fiber_make< Result >( $mol_func_name_from( ()=> {
				return $mol_fail_hidden( request( ... args ).then(
					res => { fiber.done( res ) } ,
					error => { fiber.fail( error ) } ,
				) )
			} , request ) )

			return fiber.start()
		}

	}

	export function $mol_fiber_async< Result = void >(
		request : (
			back : (
				response :  ( ... args : any[] )=> Result
			)=> ( ... args : any[] )=> void
		)=> { (): any } | void
	) : Result {

		const fiber = $mol_fiber_make< Result >( $mol_func_name_from( ()=> {
			
			const promise = new Promise( ( done , fail )=> {

				fiber.abort = request( response => ( ... args : any[] )=> {
			
					if( !fiber.masters ) return
		
					new Promise( ()=> {
						fiber.done( response( ... args ) )
					} ).catch( error => {
						fiber.fail( error )
					} )

					if( fiber.slave ) fiber.slave.start()
		
				} )

			} )

			return $mol_fail_hidden( promise )

		} , request ) )

		return fiber.start()

	}

	export function $mol_fiber_warp() {
		while( $mol_fiber.queue.length ) $mol_fiber.tick()
	}

	export function $mol_fiber_catch( catcher : ( error : Error )=> any ) {
		$mol_fiber.current.catcher = catcher
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

		static current : $mol_fiber
		
		static scheduled = 0
		static deadline = Date.now() + $mol_fiber.quant

		catcher : ( error : Error )=> any

		static tick() {

			$mol_fiber.deadline = Date.now() + $mol_fiber.quant
	
			if( $mol_fiber.queue.length == 0 ) return

			$mol_fiber.schedule()

			while( true ) {
				const resolve = $mol_fiber.queue.shift()
				if( resolve ) resolve()
				else break
			}
		}

		static schedule() {
			if( $mol_fiber.scheduled ) return

			const schedule = this.$.requestAnimationFrame || this.$.setTimeout

			$mol_fiber.scheduled = schedule( ()=> {
				$mol_fiber.scheduled = 0
				$mol_fiber.tick()
			} )
		}

		static queue = [] as ( ()=> void )[]

		constructor(
			id : string ,
			public slave : $mol_fiber ,
			public handler : ()=> Result ,
			public abort? : void | ( ()=> void ) ,
		) {
			super()
			
			this.toString = $mol_const( id )

			if( slave ) {
				slave.master = this
				this.$ = slave.$
			}
		}

		destructor() {
			if( !this.masters ) return

			for( let master of this.masters ) master.destructor()			
			this.masters = null

			if( this.abort ) this.abort()
		}

		masters = [] as $mol_fiber[]
		cursor = -1

		error : Error | Promise< Result > = undefined
		result : Result = undefined

		protected _done : ( result : Result )=> void

		done( result : Result ) {
			if( !this.masters ) return

			this.result = result
			this.error = null
			this.abort = null
			this.destructor()
			
			this.$.$mol_log( this , result )

			return result
		}

		static catched = new WeakSet

		fail( error : Error | Promise<Result> ) : Error | Promise<Result> {
			if( !this.masters ) return
			
			if( 'then' in error ) {

				const listener = this.start.bind( this )
				error = error.then( listener , listener )
			
			} else {

				if( !$mol_fiber.catched.has( error ) ) {
					if( error.stack ) error.stack = error.stack.replace( /.*\$mol_fiber.*[\n\r]*/g , '' )
					$mol_fiber.catched.add( error )
				}
				
				if( this.catcher ) {
					const value = this.catcher( error )
					if(!( value instanceof Error )) {
						this.done( value )
						return value
					}
				}

				this.abort = null
				this.destructor()
	
			}

			this.error = error			
			this.$.$mol_log( this , error )

			return error
		}

		schedule() {
			return new Promise( done => {
				$mol_fiber.queue.push( done )
				$mol_fiber.schedule()
			} )
		}

		limit() {
			
			const now = Date.now()
			if( now <= $mol_fiber.deadline ) return

			if( !$mol_fiber.current && $mol_fiber.queue.length === 0 ) {
				$mol_fiber.deadline = now + $mol_fiber.quant
				return
			}

			$mol_fail_hidden( this.schedule() )
		}

		start() {

			if( this.masters ) {

				this.$.$mol_log( this , 'start' )

				const slave = $mol_fiber.current

				try {
					
					this.cursor = -1
					this.error = undefined
					
					this.limit()
					
					$mol_fiber.current = this

					this.done( this.handler() )

				} catch( error ) {
					this.fail( error )
				} finally {
					$mol_fiber.current = slave
				}

			}

			if( this.error ) $mol_fail_hidden( this.error )
			return this.result

		}

		step() {
			return ++ this.cursor
		}

		get master() {
			return this.masters[ this.cursor ]
		}
		set master( next : $mol_fiber ) {
			this.masters[ this.cursor ] = next
		}

	}

}
