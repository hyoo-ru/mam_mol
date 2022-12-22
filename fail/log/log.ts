namespace $ {
	
	export function $mol_fail_log( error: unknown ) {
		
		if( error instanceof Promise ) return false
		if( !$mol_fail_catch( error ) ) return false
		
		console.error( error )
		return true
		
	}

}
