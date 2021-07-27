namespace $ {
	
	/** IndexedDB ObjectStore wrapper. */
	export class $mol_db_store< Schema extends $mol_db_store_schema > {
		
		constructor(
			readonly native: IDBObjectStore,
		) {}
		
		get name() {
			return this.native.name
		}
		
		get path() {
			return this.native.keyPath
		}
		
		get incremental() {
			return this.native.autoIncrement
		}
		
		/** Returns dictionary of all existen Indexes. */
		get indexes() {
			return new Proxy(
				{} as {
					[ Name in keyof Schema['Indexes'] ]: $mol_db_index<{
						Key: Schema['Indexes'][ Name ],
						Doc: Schema['Doc'],
					}>
				},
				{
					ownKeys: ()=> [ ... this.native.indexNames ],
					has: ( _, name: string )=> this.native.indexNames.contains( name ),
					get: ( _, name: string )=> new $mol_db_index( this.native.index( name ) )
				},
			)
		}
		
		/** Creates new Index */
		index_make(
			name: string,
			path = [] as string[],
			unique = false,
			multiEntry = false,
		) {
			return this.native.createIndex( name, path, { multiEntry, unique } )
		}
		
		/** Drops existen Index */
		index_drop( name: string ) {
			this.native.deleteIndex( name )
			return this
		}
		
		get transaction() {
			return new $mol_db_transaction(
				this.native.transaction
			)
		}
		
		get db() {
			return this.transaction.db
		}
		
		/** Deletes all stored Documents */
		clear() {
			return $mol_db_response( this.native.clear() )
		}
		
		/** Counts Documents by primary key(s) */
		count( keys?: Schema['Key'] | IDBKeyRange ) {
			return $mol_db_response( this.native.count( keys ) )
		}
		
		/** Stores single Document by primary key. */
		put( doc: Schema['Doc'], key?: Schema['Key'] ) {
			return $mol_db_response( this.native.put( doc, key ) )
		}
		
		/** Returns Document by primary key. */
		get( key: Schema['Key'] ) {
			return $mol_db_response( this.native.get( key ) as IDBRequest< Schema['Doc'] | undefined > )
		}
		
		/** Selects Documents by primary keys. */
		select( key?: Schema['Key'] | IDBKeyRange | null, count?: number ) {
			return $mol_db_response( this.native.getAll( key, count ) as IDBRequest< Schema['Doc'][] > )
		}
		
		/** Deletes Documents by primary key(s). */
		drop( keys: Schema['Key'] | IDBKeyRange ) {
			return $mol_db_response( this.native.delete( keys ) )
		}
		
	}
	
}
