namespace $ {
	
	/** IndexedDB instance wrapper. */
	export class $mol_db_database< Schema extends $mol_db_schema > {
		
		constructor(
			readonly native: IDBDatabase,
		) { }
		
		/** Returns database name. */
		get name() {
			return this.native.name
		}
		
		/** Returns database schema version. */
		get version() {
			return this.native.version
		}
		
		/** Returns all stores names. */
		get stores() {
			return [ ... this.native.objectStoreNames ] as ( keyof Schema )[]
		}
		
		/** Create read-only transaction. */
		read< Names extends Exclude< keyof Schema, symbol | number > >( ... names: Names[] ) {
			return new $mol_db_transaction< Pick< Schema, Names > >(
				this.native.transaction( names, 'readonly' )
			).stores
		}
		
		/** Create read/write transaction. */
		change< Names extends Exclude< keyof Schema, symbol | number > >( ... names: Names[] ) {
			return new $mol_db_transaction< Pick< Schema, Names > >(
				this.native.transaction( names, 'readwrite' )
			)
		}
		
		/**
		 * Deletes database.
		 * DB can be deleted only after end of all transactions.
		 */
		kill() {
			
			this.native.close()
			
			const request = indexedDB.deleteDatabase( this.name )
			
			request.onblocked = console.error
			return $mol_db_response( request ).then( ()=> {} )
			
		}
		
		/**
		 * Closes DB connection.
		 * Connection really be closed only after end of all transactions.
		 */
		destructor() {
			this.native.close()
		}
		
	}
	
}
