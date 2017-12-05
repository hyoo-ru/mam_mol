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

	export const $mol_task_wait = Symbol( '$mol_task_wait' )

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

		readonly masters = [] as $mol_task_state[]
		cursor = -1

		error : Error
		result : Result

		done( result : Result ) {
			this.result = result
			this.masters.length = 0
			if( this.slave ) this.slave.restart()
		}

		fail( error : Error ) {
			this.error = error
			this.masters.length = 0
			if( this.slave ) this.slave.restart()
		}

		restart() {
			let current = this as $mol_task_state

			while( current ) {
				if( current.cursor === -1 ) break
				current.cursor = -1
				if( current.slave ) current = current.slave
				else break
			}

			$mol_task_deadline = Date.now() + 15

			current.start()
		}

		limit() {
			if( Date.now() < $mol_task_deadline ) return

			requestAnimationFrame( ()=> this.restart() )
			throw $mol_task_wait
		}

		start() {
			const slave = $mol_task_current
			if( slave ) slave.step()
			
			if( this.cursor !== -1 ) {
				if( this.error ) throw this.error
				return this.result
			}
	
			this.cursor = 0
			
			try {
				
				this.limit()

				$mol_task_current = this
				
				this.result = this.handler()
				this.masters.length = 0
				
				return this.result

			} catch( error ) {

				if( error !== $mol_task_wait ) this.error = error
				
				if( this.slave ) throw error
				else return this.result

			} finally {
				$mol_task_current = slave
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
