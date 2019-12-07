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
		This ,
		Args extends any[] ,
		Result ,
	>( calculate : ( this : This , ... args : Args )=> Result ) {
		console.warn( '$mol_fiber_func is deprecated. Use $mol_fiber.func instead.' )
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
		console.warn( '$mol_fiber_method is deprecated. Use $mol_fiber.method instead.' )
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
					$mol_log2.func( master!.push ).bind( master! ) ,
					$mol_log2.func( master!.fail ).bind( master! ) ,
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

	@ $mol_class
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

	@ $mol_class
	export class $mol_fiber< Value = any > extends $mol_wrapper {

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

		value = undefined as unknown as Value
		error = null as null | Error | PromiseLike< Value >
		cursor = $mol_fiber_status.obsolete
		masters = [] as ( $mol_fiber | number | undefined )[]
		calculate! : ()=> Value
		
		schedule() {
			$mol_fiber.schedule().then( ()=> this.wake() )
		}

		@ $mol_log2.method
		wake() {
			try {
				if( this.cursor > $mol_fiber_status.actual ) return this.get()
			} catch( error ) {
				if( 'then' in error ) return
				$mol_fail_hidden( error )
			}
		}

		push( value : Value ) {
			
			value = this.$.$mol_conform( value , this.value )
			
			if( this.error || !Object.is( this.value , value ) ) {
		
				this.$.$mol_log2.info( this , $mol_fiber_token_changed1 , value , $mol_fiber_token_changed2 , this.error || this.value )
				
				this.obsolete_slaves()
				
				this.forget()
				
			} else {
				this.$.$mol_log2.info( this , $mol_fiber_token_actualized , value )
			}
			
			this.error = null
			this.value = value
			
			this.complete()

			return value
		}

		fail( error : Error | PromiseLike< Value > ) : Error | PromiseLike< Value > {
			
			this.complete()	
			
			this.$.$mol_log2.info( this , $mol_fiber_token_failed , error )
			
			this.error = error

			this.obsolete_slaves()

			return error
		}

		wait( promise : PromiseLike< Value > ) : PromiseLike< Value > {
			this.error = promise
			this.$.$mol_log2.info( this , $mol_fiber_token_sleeped , promise )
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

		@ $mol_log2_indent.method
		update() {

			const slave = $mol_fiber.current
			
			try {
					
				this.limit()
				
				$mol_fiber.current = this

				this.$.$mol_log2.info( this , $mol_fiber_token_runned )

				this.pull()

			} catch( error ) {

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

			if( this.error ) return this.$.$mol_fail_hidden( this.error )
			
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
			
			this.$.$mol_log2.info( this , $mol_fiber_token_destructed )
			this.complete()
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_native( this )
		}

	}

	export let $mol_fiber_token_runned = new $mol_log2_token( ' ► ' )
	export let $mol_fiber_token_changed1 = new $mol_log2_token( ' ˸ ' )
	export let $mol_fiber_token_changed2 = new $mol_log2_token( ' 🠈 ' )
	export let $mol_fiber_token_actualized = new $mol_log2_token( ' ✓ ' )
	export let $mol_fiber_token_sleeped = new $mol_log2_token( ' 💤 ' )
	export let $mol_fiber_token_failed = new $mol_log2_token( ' 🔥 ' )
	export let $mol_fiber_token_destructed = new $mol_log2_token( ' 🕱 ' )

	$mol_log2_legend.info( $mol_fiber_token_runned , '$mol_fiber starts execution' )
	$mol_log2_legend.info( new $mol_log2_line( $mol_fiber_token_changed1 , $mol_fiber_token_changed2 ) , '$mol_fiber value is changed to different value' )
	$mol_log2_legend.info( $mol_fiber_token_actualized , 'Actual $mol_fiber value is same as before' )
	$mol_log2_legend.info( $mol_fiber_token_sleeped , '$mol_fiber can not run now and awaits on promise' )
	$mol_log2_legend.info( $mol_fiber_token_failed , '$mol_fiber is failed and will be throw an Error or Promise' )
	$mol_log2_legend.info( $mol_fiber_token_destructed , '$mol_fiber fully destructed' )

}
