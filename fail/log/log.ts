namespace $ {
	
	export function $mol_fail_log( error: unknown ) {
		
		if( $mol_promise_like( error ) ) return false
		if( !$mol_fail_catch( error ) ) return false
		
		console.error( error )
		
		return true
		
	}

}
