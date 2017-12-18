namespace $ {

	export function $mol_task< Host , Result >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( ... args : any[] )=> Result >
	) {
		descr.value = $mol_task_wrap( descr.value )
	}

	export function $mol_task_wrap< Handler extends ( ... args : any[] )=> Result , Result = void >( handler : Handler ) {
		
		return function $mol_task_wrapper( ... args : any[] ) {
			let master = $mol_task_current && $mol_task_current.master
			if( !master ) master = new $mol_task_state< Result >( handler.bind( this , ... args ) , $mol_task_current )
			return master.start()
		} as Handler

	}

	export const $mol_task_wait = new class $mol_task_wait {}

	export let $mol_task_current : $mol_task_state

	export let $mol_task_deadline : number
	export function $mol_task_frame( timeout = 16 ) {
		$mol_task_deadline = Date.now() + timeout
	}
	$mol_task_frame()
	
	export class $mol_task_state< Result = any > {
		
		constructor(
			readonly handler : ()=> Result ,
			readonly slave : $mol_task_state = undefined ,
		) {
			if( slave ) slave.master = this
		}

		destructor() {
			if( !this.masters ) return
			for( let master of this.masters ) master.destructor()
			this.masters = null
		}

		masters = [] as $mol_task_state[]
		cursor = -1

		error : Error = undefined
		result : Result = undefined

		done( result : Result ) {
			if( !this.masters ) return
			this.result = result
			this.destructor()
			if( this.slave && !$mol_task_current ) this.slave.start()
			return result
		}

		fail( error : Error ) {
			if( !this.masters ) return
			this.error = error
			this.destructor()
			if( this.slave && !$mol_task_current ) this.slave.start()
			return error
		}

		limit() {
			if( Date.now() < $mol_task_deadline ) return

			requestAnimationFrame( ()=> {
				$mol_task_deadline = Date.now() + 15
				this.start() 
			} )

			throw $mol_task_wait
		}

		start() {
			const slave = $mol_task_current
			if( slave ) slave.step()
			
			if( !this.masters ) {
				if( this.error ) throw this.error
				return this.result
			}
	
			this.cursor = 0
			
			try {
				
				this.limit()

				$mol_task_current = this
				const result = this.handler()
				$mol_task_current = slave

				return this.done( result )

			} catch( error ) {

				$mol_task_current = slave
				
				if( error != $mol_task_wait ) this.fail( error )
				
				if( $mol_task_current ) throw error
				
				if( error !== $mol_task_wait ) console.error( error )
				return new Proxy( error , { get() { throw error } } )

			}			

		}

		step() {
			++ this.cursor
		}

		get master() {
			return this.masters[ this.cursor ]
		}
		set master( next : $mol_task_state ) {
			this.masters[ this.cursor ] = next
		}

	}

}
