namespace $ {

	const cacthed = new WeakMap< any , boolean >()

	export function $mol_fail_catch( error: unknown ) {
		
		if( typeof error !== 'object' ) return false
		if( cacthed.get( error ) ) return false
		
		cacthed.set( error , true )
		return true
		
	}
	
}
