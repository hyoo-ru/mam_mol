namespace $ {
	
	/** Starts subtasks concurrently instead of serial. */
	export function $mol_wire_race<
		Tasks extends ( ( ... args: any )=> any )[]
	>( ... tasks: Tasks ): {
		[ index in keyof Tasks ]: index extends number
			? ReturnType< Tasks[ index ] >
			: Tasks[ index ]
	} {
		
		const results = tasks.map( task => {
			
			try {
				return task()
			} catch( error ) {
				return error
			}
			
		} )
		
		const promises = results.filter( res => $mol_promise_like( res ) )
		if( promises.length ) $mol_fail( Promise.race( promises ) )
		
		const error = results.find( res => res instanceof Error )
		if( error ) $mol_fail( error )
		
		return results as any
	}
	
}
