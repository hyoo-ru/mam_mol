var requestIdleCallback : ( handler : ()=> void )=> number = requestIdleCallback || setTimeout

namespace $ {

	export const $mol_fiber_wait = new class $mol_fiber_wait {}
	
	export class $mol_fiber< Result = any > {

		static quant = 8

		static current : $mol_fiber
		
		static scheduled = 0
		static deadline = 0

		static tick() {

			$mol_fiber.scheduled = 0
			$mol_fiber.deadline = Date.now() + $mol_fiber.quant
	
			if( $mol_fiber.queue.length == 0 ) return
	
			while( true ) {
				
				const fiber = $mol_fiber.queue.shift()
				if( !fiber ) break
	
				const res = fiber.start()
	
				if( res instanceof $mol_fiber_wait.constructor ) break
			}
		}

		static schedule() {
			if( $mol_fiber.scheduled ) return

			$mol_fiber.scheduled = requestIdleCallback( $mol_fiber.tick )
		}

		static queue = [] as $mol_fiber[]

		constructor(
			readonly handler : ()=> Result ,
			readonly slave : $mol_fiber = undefined ,
		) {
			if( slave ) slave.master = this
		}

		destructor() {
			if( !this.masters ) return

			for( let master of this.masters ) {
				master.destructor()
			}
			
			this.masters = null

			if( this.abort ) this.abort()
		}

		abort : ()=> void

		masters = [] as $mol_fiber[]
		cursor = -1

		error : Error = undefined
		result : Result = undefined

		schedule() {
			if( !this.masters ) debugger

			$mol_fiber.queue.push( this )
			$mol_fiber.schedule()
		}

		complete() {
			this.abort = null
			this.destructor()

			if( !this.slave ) return
			if( $mol_fiber.current ) return
			
			this.slave.schedule()
		}

		done( result : Result ) {
			if( !this.masters ) return

			this.result = result
			this.complete()
			
			return result
		}

		fail( error : Error ) {
			if( !this.masters ) return
			
			this.error = error
			this.complete()
			
			return error
		}

		limit() {
			if( Date.now() <= $mol_fiber.deadline ) return

			if( !$mol_fiber.current && $mol_fiber.queue.length === 0 ) {
				$mol_fiber.deadline = Date.now() + $mol_fiber.quant
				return
			}

			this.schedule()
			throw $mol_fiber_wait
		}

		start() : Result {

			const slave = $mol_fiber.current
			if( slave ) slave.step()
			
			if( !this.masters ) {
				if( this.error ) throw this.error
				return this.result
			}
	
			this.cursor = 0

			try {
				
				this.limit()

				$mol_fiber.current = this
				const result = this.handler()
				$mol_fiber.current = slave

				return this.done( result )

			} catch( error ) {

				$mol_fiber.current = slave

				if( error !== $mol_fiber_wait ) this.fail( error )
				
				if( slave ) throw error
				
				if( error !== $mol_fiber_wait ) throw error
				return new Proxy( error , { get() { throw error } } )

			}	

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
