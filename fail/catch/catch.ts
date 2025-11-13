namespace $ {

	const catched = new WeakSet< any >()

	export function $mol_fail_catch( error: unknown ) {
		
		if( typeof error !== 'object' ) return false
		if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
		if( catched.has( error ) ) return false
		
		catched.add( error  )
		return true
		
	}
	
}
