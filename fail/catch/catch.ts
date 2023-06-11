namespace $ {

	const catched = new WeakMap< any , boolean >()

	export function $mol_fail_catch( error: unknown ) {
		
		if( typeof error !== 'object' ) return false
		if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
		if( catched.get( error ) ) return false
		
		catched.set( error , true )
		return true
		
	}
	
}
