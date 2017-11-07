namespace $ {

	export function $mol_log_group< Task extends Function >( name : string , task : Task ) {
		
		return function $mol_log_group_wrapper( ... args : any [] ) {
			let started = false
			let prev = $mol_log_context()

			$mol_log_context( ()=> {
				if( prev ) prev()
				started = true
				console.groupCollapsed( name )
				$mol_log_context( prev = null )
			} )
			
			try {
				return task.apply( this , args )
			} finally {
				if( started ) console.groupEnd()
				$mol_log_context( prev )
			}

		} as any as Task

	}

}
