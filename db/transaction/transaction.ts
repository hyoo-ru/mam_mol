interface IDBTransaction {
	commit(): void
}

namespace $ {
	
	/** IndexedDB Transaction wrapper. */
	export class $mol_db_transaction< Schema extends $mol_db_schema > extends $mol_object2 {
		
		constructor(
			readonly native: IDBTransaction,
		) {
			super()
		}
		
		/** Returns dictionary of all existen Stores. */
		get stores() {
			return new Proxy(
				{} as {
					[ Name in keyof Schema ]: $mol_db_store< Schema[ Name ] >
				},
				{
					ownKeys: ()=> [ ... this.native.objectStoreNames ],
					has: ( _, name: string )=> this.native.objectStoreNames.contains( name ),
					get: ( _, name: string )=> new $mol_db_store( this.native.objectStore( name ) ),
				},
			)
		}
		
		/** Creates new Store */
		store_make( name: string, indexing?: ( store: $mol_db_store<any> )=> $mol_db_store<any> ) {
			const store = this.native.db.createObjectStore( name, { autoIncrement: true } )
			indexing?.( new $mol_db_store( store ) )
			return this
		}
		
		/** Drops existen Store */
		store_drop( name: string ) {
			this.native.db.deleteObjectStore( name )
			return this
		}
		
		/** Instant abort transaction. Any errors aborts transactions automatically. */
		abort() {
			this.native.abort()
		}
		
		/** Instant commits transaction. Without errors commit proceed automatically later. */
		commit() {
			
			let done: ( result?: undefined )=> void
			let fail: ( error: Error )=> void
			
			this.native.onerror = ()=> fail( new Error( this.native.error!.message ) )
			this.native.oncomplete = ()=> done()
			
			const promise = new Promise( ( d, f )=> {
				done = d
				fail = f
			} )
			
			this.native.commit()
			
			return promise
		}
		
		get db() {
			return new $mol_db_database(
				this.native.db
			)
		}
		
	}
	
}
