namespace $ {
	
	/** IndexedDB Index wrapper. */
	export class $mol_db_index< Schema extends $mol_db_index_schema > extends $mol_object2 {
		
		constructor(
			readonly native: IDBIndex,
		) {
			super()
		}
		
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
		
		/** Selects Documents by key(s). Returns only one by default. */
		get( key: Schema['Key'] | IDBKeyRange | null, count = 1 ) {
			return $mol_db_response( this.native.getAll( key, count ) as IDBRequest< Schema['Doc'][] > )
		}
		
	}
	
}
