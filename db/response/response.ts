namespace $ {
	
	/** Converts IDBResult to Promise */
	export function $mol_db_response< Result >(
		request: IDBRequest< Result >
	) {
		
		return new Promise< Result >( ( done, fail )=> {
			request.onerror = ()=> fail( new Error( request.error!.message ) )
			request.onsuccess = ()=> done( request.result as Result )
		} )
		
	}
	
}
