namespace $ {
	
	/** IndexedDB Index wrapper. */
	export class $mol_db_index< Schema extends $mol_db_index_schema > {
		
		constructor(
			readonly native: IDBIndex,
		) { }
		
		get name() {
			return this.native.name
		}
		
		get paths() {
			return this.native.keyPath as string[]
		}
		
		get unique() {
			return this.native.unique
		}
		
		get multiple() {
			return this.native.multiEntry
		}
		
		get store() {
			return new $mol_db_store(
				this.native.objectStore
			)
		}
		
		get transaction() {
			return this.store.transaction
		}
		
		get db() {
			return this.store.db
		}
		
		/** Counts Documents by key(s) */
		count( keys?: Schema['Key'] | IDBKeyRange ) {
			return $mol_db_response( this.native.count( keys ) )
		}
		
		/** Returns Document by primary key. */
		get( key: Schema['Key'] ) {
			return $mol_db_response( this.native.get( key ) as IDBRequest< Schema['Doc'] | undefined > )
		}
		
		/** Selects Documents by primary keys. */
		select( key?: Schema['Key'] | IDBKeyRange | null, count?: number ) {
			return $mol_db_response( this.native.getAll( key, count ) as IDBRequest< Schema['Doc'][] > )
		}
		
	}
	
}
