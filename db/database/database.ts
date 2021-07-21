namespace $ {
	
	/** IndexedDB instance wrapper. */
	export class $mol_db_database extends $mol_object2 {
		
		constructor(
			readonly native: IDBDatabase,
		) {
			super()
		}
		
		/** Returns database name. */
		name() {
			return this.native.name
		}
		
		/** Returns database schema version. */
		version() {
			return this.native.version
		}
		
		/** Returns all stores names. */
		stores() {
			return [ ... this.native.objectStoreNames ]
		}
		
		/** Create read-only transaction. */
		read( ... stores: string[] ) {
			return new $mol_db_transaction(
				this.native.transaction( stores, 'readonly' )
			).stores
		}
		
		/** Create read/write transaction. */
		change( ... stores: string[] ) {
			return new $mol_db_transaction(
				this.native.transaction( stores, 'readwrite' )
			)
		}
		
		/** Deletes database. */
		kill() {
			
			this.native.close()
			
			const request = this.$.indexedDB.deleteDatabase( this.name() )
			
			request.onblocked = console.error
			return $mol_db_response( request ).then( ()=> {} )
			
		}
		
		destructor() {
			this.native.close()
		}
		
	}
	
}
