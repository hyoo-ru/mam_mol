namespace $ {

	export let $mol_task_current : $mol_task_state< any >
	
	export class $mol_task_state< Result > {
		
		constructor(
			public handler : ( ... args : any[] )=> any ,
			public slave : $mol_task_state< Result > ,
		) { }

		masters = [] as $mol_task_state< any >[]
		cursor = -1
		result : Result

		done( res : Result ) {
			this.result = res
			if( this.slave ) this.slave.notify()
		}

		error( error : any ) : Result {

			if( typeof error.then === 'function' ) {
				error.then(
					( val: any )=> this.done( val ) ,
					( error : any )=> this.done( this.error( error ) ) ,
				)
				error = new Error( 'Wait...' )
			}
	
			return new Proxy<Error>( error , {
				get() { throw error } ,
				apply() { throw error } ,
			} ) as any as Result
	
		}

		notify() {
			if( this.cursor === -1 ) return
			this.cursor = -1
			
			if( this.slave ) this.slave.notify()
			else new $mol_defer( ()=> this.run() )
		}

		run() {
			if( this.cursor !== -1 ) return this.result
			
			const slave = $mol_task_current

			$mol_task_current = this
			this.cursor = 0
			
			try { this.result = this.handler() }
			catch( error ) { this.result = this.error( error ) }

			$mol_task_current = slave

			return this.result
		}

	}

	export function $mol_task_wrap< Result >( handler : ( ... args : any[] )=> Result ) {
		
		return function $mol_task_wrapper( ... args : any[] ) : Result {

			const slave = $mol_task_current

			if( slave ) {
				const master = slave.masters[ slave.cursor ++ ]
				if( master ) return master.run()
			}

			const master = new $mol_task_state( ()=> handler( ... args ) , slave )

			if( slave ) slave.masters[ slave.cursor - 1 ] = master

			return master.run()
		} as typeof handler

	}

}
