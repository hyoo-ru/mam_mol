namespace $ {
	
	export type $mol_db_store_schema = {
		Key: IDBValidKey,
		Doc: unknown,
		Indexes: Record< string, IDBValidKey[] >,
	}
	
}
