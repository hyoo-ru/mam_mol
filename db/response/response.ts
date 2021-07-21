namespace $ {
	
	/** Converts IDBResult to Promise */
	export function $mol_db_response< Result >(
		request: IDBRequest< Result >
	) {
		
		let done: ( result: Result )=> void
		let fail: ( error: Error )=> void
		
		request.onerror = ()=> fail( new Error( request.error!.message ) )
		request.onsuccess = ()=> done( request.result )
			
		return new Promise< Result >( ( d, f )=> {
			done = d
			fail = f
		} )
		
	}
	
}
