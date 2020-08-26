namespace $ {

	export const enum $mol_fiber_status {
		persist = -3 ,
		actual = -2 ,
		doubt = -1 ,
		obsolete = 0 ,
	}

	export function $mol_fiber_defer< Value = void >( calculate : ()=> Value ) {
		
		const fiber = new $mol_fiber
		
		fiber.calculate = calculate
		fiber[ Symbol.toStringTag ] = calculate.name
		
		fiber.schedule()
		
		return fiber
	}

	export function $mol_fiber_func<
		This ,
		Args extends any[] ,
		Result ,
	>( calculate : ( this : This , ... args : Args )=> Result ) {
		$mol_ambient({}).$mol_log3_warn({
			place: '$mol_fiber_func',
			message: 'Deprecated' ,
			hint: 'Use $mol_fiber.func instead',
		})
		return $mol_fiber.func( calculate )
	}

	export function $mol_fiber_root<
		Calculate extends ( this : This , ... args : any[] )=> Result ,
		Result = void ,
		This = void ,
	>( calculate : Calculate ) {
		
		const wrapper = function( ... args : any[] ) {
			const fiber = new $mol_fiber< Result >()
			fiber.calculate = calculate.bind( this , ... args )
			fiber[ Symbol.toStringTag ] = wrapper[ Symbol.toStringTag ]
			return fiber.wake()
		} as Calculate
		
		wrapper[ Symbol.toStringTag ] = calculate.name
		
		return wrapper
	}

	export function $mol_fiber_method< Host , Value >(
		obj : Host ,
		name : keyof Host ,
		descr : TypedPropertyDescriptor< ( this : Host , ... args : any[] )=> Value >
	) {
		$mol_ambient({}).$mol_log3_warn({
			place: '$mol_fiber_method',
			message: 'Deprecated' ,
			hint: 'Use $mol_fiber.method instead',
		})
		return $mol_fiber.method( obj , name , descr )
	}

	export function $mol_fiber_async< Args extends any[] , Value >( task : ( ... args : Args )=> Value ) {

		return ( ... args : Args )=> new Promise< Value >( $mol_fiber_root( ( done , fail )=> {

			try {

				done( task( ... args ) )

			} catch( error ) {

				if( 'then' in error ) return $mol_fail_hidden( error )

				fail( error )

			}

		} ) )

	}

	export function $mol_fiber_sync< Args extends any[] , Value = void , This = void >(
		request : ( this : This , ... args : Args )=> PromiseLike< Value >
	) : ( ... args : Args )=> Value {

		return function $mol_fiber_sync_wrapper( this : This , ... args : Args ) {

			const slave = $mol_fiber.current

			let master = slave && slave.master
			if( !master || master.constructor !== $mol_fiber ) {
				master = new $mol_fiber
				master.cursor = $mol_fiber_status.persist
				master.error = ( request.call( this , ... args ) as PromiseLike< Value > ).then(
					( next : Value )=> master!.push( next ) ,
					( error : Error )=> master!.fail( error ) ,
				)
				const prefix = slave ? `${ slave }/${ slave.cursor / 2 }:` : '/'
				master[ Symbol.toStringTag ] = prefix + ( request.name || $mol_fiber_sync.name )
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
			return func()
		} finally {
			$mol_fiber.current = prev
		}
	}

	export function $mol_fiber_unlimit< Result >( task : ()=> Result ) {
		
		const deadline = $mol_fiber.deadline
		
		try {

			$mol_fiber.deadline = Number.POSITIVE_INFINITY
			
			return task()

		} finally {

			$mol_fiber.deadline = deadline

		}

	}

	export class $mol_fiber_solid extends $mol_wrapper {

		static func< This , Args extends any[] , Result >( task : ( this : This , ... args : Args )=> Result ) {

			function wrapped( this : This , ... args : Args ) {

				const deadline = $mol_fiber.deadline

				try {

					$mol_fiber.deadline = Number.POSITIVE_INFINITY
					
					return task.call( this , ... args ) as Result

				} catch( error ) {

					if( 'then' in error ) $mol_fail( new Error( 'Solid fiber can not be suspended.' ) )
					return $mol_fail_hidden( error )

				} finally {

					$mol_fiber.deadline = deadline

				}
		
			}

			return $mol_fiber.func( wrapped )

		}

	}

	export class $mol_fiber< Value = any > extends $mol_wrapper {

		static logs = false

		static wrap< Func extends ( ... args : any[] )=> any >( task : Func ) {
			
			return function $mol_fiber_wrapper( this : ThisParameterType< Func > , ... args : Parameters< Func > ) {

				const slave = $mol_fiber.current

				let master = slave && slave.master
				if( !master || master.constructor !== $mol_fiber ) {
					master = new $mol_fiber
					master.calculate = task.bind( this , ... args )
					const prefix = slave ? `${ slave }/${ slave.cursor / 2 }:` : '/'
					master[ Symbol.toStringTag ] = `${ prefix }${ task.name }`
				}
				
				return master.get()

			}

		}

		static quant = 16
		static deadline = 0
		static liveline = 0

		static current = null as null | $mol_fiber
		
		static scheduled = null as null | $mol_after_frame
		static queue = [] as ( ()=> PromiseLike< any > )[]
		
		static async tick() {
	
			while( $mol_fiber.queue.length > 0 ) {

				const now = Date.now()

				if( now >= $mol_fiber.deadline ) {
					$mol_fiber.schedule()
					$mol_fiber.liveline = now
					return 
				}

				const task = $mol_fiber.queue.shift()!
				await task()

			}
			
		}

		static schedule() {

			if( !$mol_fiber.scheduled ) {

				$mol_fiber.scheduled = new $mol_after_frame( async ()=> {
					
					const now = Date.now()
					let quant = $mol_fiber.quant
					
					if( $mol_fiber.liveline ) {
						quant = Math.max( quant , Math.floor( ( now - $mol_fiber.liveline ) / 2 ) )
						$mol_fiber.liveline = 0
					}
					
					$mol_fiber.deadline = now + quant
					$mol_fiber.scheduled = null
					
					await $mol_fiber.tick()

				} )

			}

			const promise : Promise< any > = new this.$.Promise( done => this.queue.push( ()=> ( done() , promise ) ) )
			return promise

		}

		cursor = $mol_fiber_status.obsolete
		masters = [] as ( $mol_fiber | number | undefined )[]
		calculate! : ()=> Value
		
		_value = undefined as unknown as Value
		get value() { return this._value }
		set value( next : Value ) {
			this._value = next
		}

		_error = null as null | Error | PromiseLike< Value >
		get error() { return this._error }
		set error( next : null | Error | PromiseLike< Value > ) {
			this._error = next
		}

		schedule() {
			$mol_fiber.schedule().then( ()=> this.wake() )
		}

		wake() {

			const unscoupe = this.$.$mol_log3_area_lazy({
				place : this ,
				message : 'Wake'
			})
			
			try {
				if( this.cursor > $mol_fiber_status.actual ) return this.get()
			} catch( error ) {
				if( 'then' in error ) return
				$mol_fail_hidden( error )
			} finally {
				unscoupe()
			}

		}

		push( value : Value ) {
			
			value = this.$.$mol_conform( value , this.value )
			
			if( this.error !== null || !Object.is( this.value , value ) ) {
		
				if( $mol_fiber.logs ) this.$.$mol_log3_done({
					place : this ,
					message : 'Changed',
					next : value , 
					value : this.value ,
					error : this.error ,
				})
				
				this.obsolete_slaves()
				
				this.forget()
				
			} else {
				if( $mol_fiber.logs ) this.$.$mol_log3_done({
					place : this , 
					message : 'Same value' ,
					value ,
				})
			}
			
			this.error = null
			this.value = value
			
			this.complete()

			return value
		}

		fail( error : Error ) : Error {
			
			this.complete()	
			
			if( $mol_fiber.logs ) this.$.$mol_log3_fail({
				place : this , 
				message : error.message ,
			})
			
			this.error = error

			this.obsolete_slaves()

			return error
		}

		wait( promise : PromiseLike< Value > ) : PromiseLike< Value > {
			this.error = promise
			if( $mol_fiber.logs ) this.$.$mol_log3_warn({
				place : this ,
				message : `Wait` ,
				hint : `Don't panic, it's normal` , 
				promise ,
			})
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
			
			if( $mol_fiber.logs ) this.$.$mol_log3_come({
				place : this ,
				message : 'Pull' ,
			})

			this.push( this.calculate() )

		}

		update() {

			const slave = $mol_fiber.current
			
			try {
					
				// this.limit()
				
				$mol_fiber.current = this

				this.pull()

			} catch( error ) {

				if( Object( error ) !== error ) error = new Error( error )

				if( 'then' in error ) {
					
					if( !slave ) {
						const listener = ()=> this.wake()
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

			if( this.cursor > $mol_fiber_status.obsolete ) {
				this.$.$mol_fail( new Error( `Cyclic dependency at ${ this }` ) )
			}
			
			const slave = $mol_fiber.current
			if( slave ) slave.master = this
			
			if( this.cursor > $mol_fiber_status.actual ) this.update()

			if( this.error !== null ) return this.$.$mol_fail_hidden( this.error )
			
			return this.value

		}

		limit() {

			if( !$mol_fiber.deadline ) return
			if( !$mol_fiber.current ) return

			if( Date.now() < $mol_fiber.deadline ) return

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
			
			if( $mol_fiber.logs ) this.$.$mol_log3_done({
				place : this , 
				message : 'Destructed' ,
			})

			this.complete()
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_native( this )
		}

	}

}
