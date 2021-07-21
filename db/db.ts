namespace $ {
	
	/**
	 * Creates new or returns existen database with automatic chema migration.
	 * Schema version is based on migrations count.
	 */
	export async function $mol_db(
		this: $,
		name: string,
		migrations?: ( ( transaction: $mol_db_transaction )=> $mol_db_transaction )[],
	) {
		
		const request = this.indexedDB.open( name, migrations ? migrations.length + 1 : undefined )
		
		request.onupgradeneeded = event => {
			
			if( !migrations ) return
			
			migrations.splice( 0, event.oldVersion - 1 )
			const transaction = new $mol_db_transaction( request.transaction! )
			
			const migrate = $mol_data_pipe( ... migrations )
			migrate( transaction )
			
		}
		
		const db = await $mol_db_response( request )
		
		return new $mol_db_database( db )
	}
	
}
