namespace $ {

	export function $mol_log_group< Task extends Function >( name : string , task : Task ) {
		
		return function $mol_log_group_wrapper( ... args : any [] ) {
			const filter = $mol_log_filter()
			if( filter == null ) return task.apply( this , args )

			let started = false
			let prev = $mol_log_context()

			$mol_log_context( ()=> {
				if( prev ) prev()
				started = true
				if( filter ) console.group( name )
				else console.groupCollapsed( name )
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
