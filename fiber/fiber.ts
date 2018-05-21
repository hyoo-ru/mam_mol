namespace $ {

	export let $mol_fiber_stack = [] as $mol_fiber[]

	export function $mol_fiber_make< Result = void >( handler : ()=> Result , abort? : void | ( ()=> void ) ) {
		if( $mol_fiber.current ) $mol_fiber.current.step()
		let master = $mol_fiber.current && $mol_fiber.current.master as $mol_fiber< Result >
		if( master ) return master 
		
		return new $mol_fiber< Result >( $mol_fiber.current , handler , abort )
	}
	
	export function $mol_fiber_start< Result = void >( handler : ()=> Result ) {
		return $mol_fiber_make( handler ).start()
	}

	export function $mol_fiber_defer< Result = void >( handler : ()=> Result ) {
		const defer = $mol_fiber.$.requestAnimationFrame || $mol_fiber.$.setTimeout
		defer( $mol_fiber_func( handler ) )
	}

	export function $mol_fiber_func< Handler extends ( ... args : any[] )=> Result , Result = void >( handler : Handler ) {
		return function $mol_fiber_func_wrapper( ... args : any[] ) {
			return $mol_fiber_make( handler.bind( this , ... args ) as ()=> Result ).start()
		} as Handler
	}

	export function $mol_fiber_method< Host , Result >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( ... args : any[] )=> Result >
	) {
		descr.value = $mol_fiber_func( descr.value )
	}

	export function $mol_fiber_sync< Result = void >(
		request : ()=> PromiseLike< Result >
	) : Result {

		const fiber = $mol_fiber_make< Result >( ()=> {
			throw request().then(
				res => { fiber.done( res ) } ,
				error => { fiber.fail( error ) } ,
			)
		} )

		return fiber.start()

	}

	export function $mol_fiber_async< Result = void >(
		request : (
			back : (
				response :  ( ... args : any[] )=> Result
			)=> ( ... args : any[] )=> void
		)=> { (): any } | void
	) : Result {

		const fiber = $mol_fiber_make< Result >( ()=> {
			
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

			throw promise

		} )

		return fiber.start()

	}

	export function $mol_fiber_warp() {
		while( $mol_fiber.queue.length ) $mol_fiber.tick()
	}

	export function $mol_fiber_catch( catcher : ( error : Error )=> any ) {
		$mol_fiber.current.catcher = catcher
	}

	export class $mol_fiber< Result = any > extends $mol_object2 {

		static $ : typeof $mol_object2.$ & { Promise : PromiseConstructor }
		$ : typeof $mol_object2.$ & { Promise : PromiseConstructor }

		static quant = 8

		static current : $mol_fiber
		
		static scheduled = 0
		static deadline = Date.now() + $mol_fiber.quant

		catcher : ( error : Error )=> any

		static tick() {

			const now = Date.now()
			let elapsed = Math.max( 0 , now - $mol_fiber.deadline )
			$mol_fiber.deadline = now + $mol_fiber.quant + Math.min( elapsed , 1000 ) / 10
	
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
			public slave : $mol_fiber ,
			public handler : ()=> Result ,
			public abort? : void | ( ()=> void ) ,
		) {
			super()

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

		error : Error = undefined
		result : Result = undefined

		protected _done : ( result : Result )=> void

		done( result : Result ) {
			if( !this.masters ) return

			this.result = result
			this.abort = null
			this.destructor()
			
			return result
		}

		static catched = new WeakSet

		fail( error : Error | Promise<Result> ) : Error | Promise<Result> {
			if( !this.masters ) return
			
			if( error instanceof Promise ) {
				const self = this
				const listener = function $mol_fiber_listener() {
					return self.start()
				}
				return error.then( listener , listener )
			} else {
				if( !$mol_fiber.catched.has( error ) ) {
					if( error.stack ) error.stack = error.stack.replace( /.*\$mol_fiber.*[\n\r]*/g , '' )
					console.error( error )
					$mol_fiber.catched.add( error )
				}
			}

			if( this.catcher ) {
				const value = this.catcher( error )
				if(!( value instanceof Error )) {
					this.done( value )
					return error
				}
			}

			this.error = error
			this.abort = null
			this.destructor()
			
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

			throw this.schedule()
		}

		start() {

			if( this.masters ) {
	
				if( $mol_fiber.current ) {
					this.execute()
				} else {

					const self = this
					new Promise( function $mol_fiber_catcher() {
						self.execute()
					} ).catch( error => {

						let fiber = this as $mol_fiber
						while( fiber.masters && fiber.master && fiber.master.masters ) fiber = fiber.master

						while( fiber ) {
							error = fiber.fail( error )

							if( error instanceof Promise ) return

							if( error instanceof Error ) {
								fiber = fiber.slave
								continue
							} else {
								if( fiber.slave ) fiber.slave.start()
								break
							}

						}
						
					} )
					
				}

			}

			if( this.error ) throw this.error
			return this.result

		}

		execute() {

			const slave = $mol_fiber.current
			
			this.limit()

			this.cursor = -1
			
			try {
				$mol_fiber.current = this
				var res = this.handler()
				this.done( res )
				if( !slave && this.slave ) this.schedule().then( this.slave.start() )
			} finally {
				$mol_fiber.current = slave
			}

			return res
		}

		step() {
			++ this.cursor
		}

		get master() {
			return this.masters[ this.cursor ]
		}
		set master( next : $mol_fiber ) {
			this.masters[ this.cursor ] = next
		}

		toString() {
			if( !this.slave ) return ''
			return this.slave + '/' + this.slave.masters.indexOf( this )
		}

	}

}
