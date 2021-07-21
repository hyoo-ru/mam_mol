namespace $ {
	
	/** IndexedDB Index wrapper. */
	export class $mol_db_index extends $mol_object2 {
		
		constructor(
			readonly native: IDBIndex,
		) {
			super()
		}
		
		name() {
			return this.native.name
		}
		
		paths() {
			return this.native.keyPath as string[]
		}
		
		unique() {
			return this.native.unique
		}
		
		multiple() {
			return this.native.multiEntry
		}
		
		store() {
			return new $mol_db_store(
				this.native.objectStore
			)
		}
		
		transaction() {
			return this.store().transaction()
		}
		
		db() {
			return this.store().db()
		}
		
		/** Counts Documents by key(s) */
		count( keys?: IDBArrayKey | IDBKeyRange ) {
			return $mol_db_response( this.native.count( keys ) )
		}
		
		/** Selects Documents by key(s). Returns only one by default. */
		get< Docs extends any[] >( key: IDBArrayKey | IDBKeyRange | null, count = 1 ) {
			return $mol_db_response( this.native.getAll( key, count ) as any as IDBRequest< Docs > )
		}
		
	}
	
}
