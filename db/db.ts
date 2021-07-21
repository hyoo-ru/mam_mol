namespace $ {
	
	/** IndexedDB instance wrapper. */
	export class $mol_db extends $mol_object2 {
		
		constructor(
			readonly native: IDBDatabase,
		) {
			super()
		}
		
		static factory = indexedDB
		
		/**
		 * Creates new or returns existen database with automatic chema migration.
		 * Schema version is based on migrations count.
		 */
		static take(
			name: string,
			migrations?: ( ( transaction: $mol_db_transaction )=> $mol_db_transaction )[],
		) {
			
			const request = this.factory.open( name, migrations ? migrations.length + 1 : undefined )
			
			request.onupgradeneeded = event => {
				
				if( !migrations ) return
				
				migrations.splice( 0, event.oldVersion - 1 )
				const transaction = new $mol_db_transaction( request.transaction! )
				
				const migrate = $mol_data_pipe( ... migrations )
				migrate( transaction )
				
			}
			
			return $mol_db_response( request ).then( db => new $mol_db( db ) )
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
			).stores()
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
			
			const klass = this.constructor as typeof $mol_db
			const request = klass.factory.deleteDatabase( this.name() )
			
			request.onblocked = console.error
			return $mol_db_response( request ).then( ()=> {} )
			
		}
		
		destructor() {
			this.native.close()
		}
		
	}
	
}
