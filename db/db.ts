namespace $ {
	
	/**
	 * Creates new or returns existen database with automatic chema migration.
	 * Schema version is based on migrations count.
	 */
	export async function $mol_db< Schema extends $mol_db_schema >(
		this: $,
		name: string,
		... migrations: ( ( transaction: $mol_db_transaction<any> )=> $mol_db_transaction<any> )[]
	) {
		
		const request = this.indexedDB.open( name, migrations.length ? migrations.length + 1 : undefined )
		
		request.onupgradeneeded = event => {
			
			migrations.splice( 0, event.oldVersion - 1 )
			const transaction = new $mol_db_transaction( request.transaction! )
			
			const migrate = $mol_data_pipe( ... migrations )
			migrate( transaction )
			
		}
		
		const db = await $mol_db_response( request )
		
		return new $mol_db_database< Schema >( db )
	}
	
}
