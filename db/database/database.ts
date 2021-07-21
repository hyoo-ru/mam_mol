namespace $ {
	
	/** IndexedDB instance wrapper. */
	export class $mol_db_database< Schema extends $mol_db_schema > extends $mol_object2 {
		
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
