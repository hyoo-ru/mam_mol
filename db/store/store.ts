namespace $ {
	
	/** IndexedDB ObjectStore wrapper. */
	export class $mol_db_store extends $mol_object2 {
		
		constructor(
			readonly native: IDBObjectStore,
		) {
			super()
		}
		
		name() {
			return this.native.name
		}
		
		path() {
			return this.native.keyPath
		}
		
		incremental() {
			return this.native.autoIncrement
		}
		
		/** Returns dictionary of all existen Indexes. */
		get indexes() {
			return new Proxy(
				{} as Record< string, $mol_db_index >,
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
			this.native.createIndex( name, path, { multiEntry, unique } )
			return this
		}
		
		/** Drops existen Index */
		index_drop( name: string ) {
			this.native.deleteIndex( name )
			return this
		}
		
		transaction() {
			return new $mol_db_transaction(
				this.native.transaction
			)
		}
		
		db() {
			return this.transaction().db()
		}
		
		/** Deletes all stored Documents */
		clear() {
			return $mol_db_response( this.native.clear() )
		}
		
		/** Counts Documents by primary key(s) */
		count( keys?: IDBValidKey | IDBKeyRange ) {
			return $mol_db_response( this.native.count( keys ) )
		}
		
		/** Stores single Document by primary key. */
		put( key: IDBValidKey, doc: any ) {
			return $mol_db_response( this.native.put( doc, key ) )
		}
		
		/** Selects Documents by primary key(s). Returns only one by default. */
		get< Docs extends any[] >( key: IDBValidKey | IDBKeyRange | null, count = 1 ) {
			return $mol_db_response( this.native.getAll( key, count ) as any as IDBRequest< Docs > )
		}
		
		/** Deletes Documents by primary key(s). */
		drop( keys: IDBValidKey | IDBKeyRange ) {
			return $mol_db_response( this.native.delete( keys ) )
		}
		
	}
	
}
