namespace $ {

	export const enum $mol_fiber_status {
		persist = -3 , // 🗹
		actual = -2 , // ✔
		doubt = -1 , // �
		obsolete = 0 , // ✘
	}

	export function $mol_fiber_defer< Value = void >( calculate : ()=> Value ) {
		
		const fiber = new $mol_fiber
		
		fiber.calculate = calculate
		fiber[ Symbol.toStringTag ] = calculate.name
		
		fiber.schedule()
		
		return fiber
	}

	export function $mol_fiber_func<
		Calculate extends ( this : This , ... args : any[] )=> Value ,
		Value = void ,
		This = void ,
	>( calculate : Calculate ) {
		
		const wrapper = function $mol_fiber_func_wrapper( ... args : any[] ) {
			
			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master || master.constructor !== $mol_fiber ) {
				master = new $mol_fiber
				master.calculate = calculate.bind( this , ... args )
				const prefix = slave ? `${ slave }/${ slave.cursor / 2 }:` : '/'
				master[ Symbol.toStringTag ] = prefix + calculate.name
			}

			return master.get()

		} as Calculate

		wrapper[ Symbol.toStringTag ] = calculate.name

		return wrapper

	}

	export function $mol_fiber_method< Host , Value >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( this : Host , ... args : any[] )=> Value >
	) {

		const calculate = descr.value!
		
		descr.value = function $mol_fiber_action_wrapper( ... args : any[] ) {

			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master || master.constructor !== $mol_fiber ) {
				master = new $mol_fiber
				master.calculate = calculate.bind( this , ... args )
				const prefix = slave ? `${ slave }/${ slave.cursor / 2 }:` : '/'
				master[ Symbol.toStringTag ] = `${ prefix }${ this }.${ name }()`
			}
			
			return master.get()

		}

	}

	export function $mol_fiber_sync< Args extends any[] , Value = void , This = void >(
		request : ( this : This , ... args : Args )=> PromiseLike< Value >
	) : ( ... args : Args )=> Value {

		return function $mol_fiber_sync_wrapper( this : This , ... args : Args ) {

			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master || master.constructor !== $mol_fiber ) {
				master = $mol_fiber.make( fiber => {
					fiber.cursor = $mol_fiber_status.persist
					fiber.error = ( request.call( this , ... args ) as PromiseLike< Value > ).then(
						res => fiber.push( res ) ,
						err => fiber.fail( err ) ,
					)
					const prefix = slave ? `${ slave }/${ slave.cursor / 2 }:` : '/'
					fiber[ Symbol.toStringTag ] = prefix + ( request.name || $mol_fiber_sync.name )
				} )
			}

			return master.get()

		}

	}

	export async function $mol_fiber_warp() {
		const deadline = $mol_fiber.deadline
		try {
			$mol_fiber.deadline = Number.POSITIVE_INFINITY
			while( $mol_fiber.queue.length ) await $mol_fiber.tick()
			return Promise.resolve()
		} finally {
			$mol_fiber.deadline = deadline
		}
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

	export function $mol_fiber_unlimit( func : ()=> any ) {
		const deadline = $mol_fiber.deadline
		try {
			$mol_fiber.deadline = Number.POSITIVE_INFINITY
			func()
		} finally {
			$mol_fiber.deadline = deadline
		}
	}

	export class $mol_fiber< Value = any > extends $mol_object2 {

		static quant = 32
		static deadline = 0

		static current = null as null | $mol_fiber
		
		static scheduled = null as null | $mol_after_frame
		static queue = [] as ( ()=> PromiseLike< any > )[]
		
		
		static async tick() {
	
			while( $mol_fiber.queue.length > 0 ) {

				if( Date.now() > $mol_fiber.deadline ) {
					$mol_fiber.schedule()
					return 
				}

				const task = $mol_fiber.queue.shift()!
				await task()

			}
			
		}

		static schedule() {

			if( !$mol_fiber.scheduled ) {

				$mol_fiber.scheduled = new $mol_after_frame( ()=> {
					$mol_fiber.deadline = Math.max( $mol_fiber.deadline , Date.now() + $mol_fiber.quant )
					$mol_fiber.scheduled = null
					$mol_fiber.tick()
				} )

			}

			const promise : Promise< any > = new this.$.Promise( done => this.queue.push( ()=> ( done() , promise ) ) )
			return promise

		}

		value = undefined as unknown as Value
		error = null as null | Error | PromiseLike< Value >
		cursor = $mol_fiber_status.obsolete
		masters = [] as ( $mol_fiber | number | undefined )[]
		calculate! : ()=> Value
		
		schedule() {
			$mol_fiber.schedule().then( this.wake.bind( this ) )
		}

		wake() {
			this.$.$mol_log( this , '⏰' )
			try {
				if( this.cursor > $mol_fiber_status.actual ) return this.get()
			} catch( error ) {
				if( 'then' in error ) return
				$mol_fail_hidden( error )
			}
		}

		push( value : Value ) {
			
			value = this.$.$mol_conform( value , this.value )
			
			if( !$mol_compare_any( this.value , value ) ) {
		
				this.$.$mol_log( this , value , '🠈' , this.value  )
				
				this.obsolete_slaves()
				
				this.forget()
				
			} else {
				this.$.$mol_log( this , '✔' , value )
				if( this.error ) this.obsolete_slaves()
			}
			
			this.error = null
			this.value = value
			
			this.complete()

			return value
		}

		fail( error : Error ) : Error {
			
			this.complete()	
			
			this.error = error
			
			this.$.$mol_log( this , '🔥' , error.message )

			this.obsolete_slaves()

			return error
		}

		wait( promise : PromiseLike< Value > ) : PromiseLike< Value > {
			this.error = promise
			this.$.$mol_log( this , '💤' )
			this.cursor = $mol_fiber_status.obsolete
			return promise
		}

		complete() {

			if( this.cursor <= $mol_fiber_status.actual ) return

			for( let index = 0 ; index < this.masters.length ; index += 2  ) {
				this.complete_master( index )
			}
			
			this.cursor = $mol_fiber_status.actual
		}
		
		complete_master( master_index : number ) {
			this.disobey( master_index )
		}

		pull() {
			this.push( this.calculate() )
		}

		update() {

			const slave = $mol_fiber.current
			
			try {
					
				this.error = null
				
				this.limit()
				
				$mol_fiber.current = this

				this.$.$mol_log( this , '►' )

				this.pull()

			} catch( error ) {

				if( 'then' in error ) {
					
					if( !slave ) {
						const listener = this.wake.bind( this )
						error = error.then( listener , listener )
					}

					this.wait( error )

				} else {
					this.fail( error )
				}

			} finally {
				$mol_fiber.current = slave
			}

		}

		get() {

			if( this.cursor > $mol_fiber_status.obsolete ) this.$.$mol_fail( new Error( 'Cyclic dependency' ) )
			
			const slave = $mol_fiber.current
			if( slave ) slave.master = this
			
			if( this.cursor > $mol_fiber_status.actual ) this.update()

			if( this.error ) this.$.$mol_fail_hidden( this.error )
			return this.value

		}

		limit() {

			const now = Date.now()

			const overtime = now - $mol_fiber.deadline
			if( overtime < 0 ) return

			/// after debugger
			if( overtime > 500 ) {
				$mol_fiber.deadline = now + $mol_fiber.quant
				return
			}

			this.$.$mol_fail_hidden( $mol_fiber.schedule() )
		}

		get master() {
			return this.masters[ this.cursor ] as $mol_fiber
		}
		set master( next : $mol_fiber ) {

			if( this.cursor === $mol_fiber_status.doubt ) return
			
			const cursor = this.cursor
			const prev = this.masters[ this.cursor ]
			
			if( prev !== next ) {
				if( prev ) this.rescue( prev as $mol_fiber , cursor )
				this.masters[ cursor ] = next
				this.masters[ cursor + 1 ] = this.obey( next , cursor )
			}
			
			this.cursor = cursor + 2
		}

		rescue( master : $mol_fiber , master_index : number ) {}

		obey( master : $mol_fiber , master_index : number ) { return -1 }
		lead( slave : $mol_fiber , master_index : number ) { return -1 }

		dislead( slave_index : number ) {
			this.destructor()
		}

		disobey( master_index : number ) {
			
			const master = this.masters[ master_index ] as $mol_fiber
			if( !master ) return

			master.dislead( this.masters[ master_index + 1 ] as number )
			
			this.masters[ master_index ] = undefined
			this.masters[ master_index + 1 ] = undefined

			this.$.$mol_array_trim( this.masters )

		}

		obsolete_slaves() { }

		obsolete( master_index : number ) { }

		forget() {
			this.value = undefined as unknown as Value
		}

		abort() {
			this.forget()
			return true
		}

		destructor() {
			if( !this.abort() ) return
			
			this.$.$mol_log( this , '🕱' , this.value )
			this.complete()
		}

	}

}
