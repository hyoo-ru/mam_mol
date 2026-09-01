interface IDBTransaction {
	commit(): void
}

namespace $ {
	
	/** IndexedDB Transaction wrapper. */
	export class $mol_db_transaction< Schema extends $mol_db_schema > {
		
		constructor(
			readonly native: IDBTransaction,
		) {}
		
		/** Returns dictionary of all existen Stores. */
		get stores() {
			return new Proxy(
				{} as {
					[ Name in keyof Schema ]: $mol_db_store< Schema[ Name ] >
				},
				{
					ownKeys: ()=> [ ... this.native.objectStoreNames ],
					has: ( _, name: string )=> this.native.objectStoreNames.contains( name ),
					get: ( _, name: string, proxy )=> ( name in proxy )
						? new $mol_db_store( this.native.objectStore( name ) )
						: undefined,
				},
			)
		}
		
		/** Creates new Store */
		store_make( name: string ) {
			return this.native.db.createObjectStore( name, { autoIncrement: true } )
		}
		
		/** Drops existen Store */
		store_drop( name: string ) {
			this.native.db.deleteObjectStore( name )
			return this
		}
		
		/** Instant abort transaction. Any errors aborts transactions automatically. */
		abort() {
			if( this.native.error ) return
			this.native.abort()
		}
		
		/** Instant commits transaction. Without errors commit proceed automatically later. */
		commit() {
			
			this.native.commit?.()
			
			return new Promise< void >( ( done, fail )=> {
				this.native.onerror = ()=> fail( new Error( this.native.error!.message ) )
				this.native.oncomplete = ()=> done()
			} )
			
		}
		
		get db() {
			return new $mol_db_database(
				this.native.db
			)
		}
		
	}
	
}
