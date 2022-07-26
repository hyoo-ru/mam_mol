namespace $ {
	
	export function $mol_wire_race<
		Tasks extends ( ()=> any )[]
	>( ... tasks: Tasks ) {
		
		const results = tasks.map( task => {
			
			try {
				return task()
			} catch( error ) {
				return error
			}
			
		} )
		
		const promises = results.filter( res => res instanceof Promise )
		if( promises.length ) $mol_fail( Promise.race( promises ) )
		
		const error = results.find( res => res instanceof Error )
		if( error ) $mol_fail( error )
		
		return results
	}
	
}
