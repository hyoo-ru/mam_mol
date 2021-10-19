namespace $ {
	
	/**
	 * Creates new or returns existen database with automatic schema migration.
	 * Schema version is based on migrations count.
	 * Migrations code mustn't be changed after deploy.
	 * Only adding migrations at the end is allowed.
	 * Only new migrations will be applyed to existen DB.
	 * Schema changes allowed only through migratios. 
	 */
	export async function $mol_db< Schema extends $mol_db_schema >(
		this: $,
		name: string,
		... migrations: ( ( transaction: $mol_db_transaction< $mol_db_schema > )=> void )[]
	) {
		
		const request = this.$mol_dom_context.indexedDB.open( name, migrations.length ? migrations.length + 1 : undefined )
		
		request.onupgradeneeded = event => {
			
			migrations.splice( 0, event.oldVersion - 1 )
			const transaction = new $mol_db_transaction( request.transaction! )
			
			for( const migrate of migrations ) migrate( transaction )
			
		}
		
		const db = await $mol_db_response( request )
		
		return new $mol_db_database< Schema >( db )
	}
	
}
