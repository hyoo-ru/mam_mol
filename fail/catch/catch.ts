namespace $ {

	const cacthed = new WeakMap< any , boolean >()

	export function $mol_fail_catch( error: unknown ) {
		
		if( typeof error !== 'object' ) return false
		if( error instanceof Promise ) $mol_fail_hidden( error )
		if( cacthed.get( error ) ) return false
		
		cacthed.set( error , true )
		return true
		
	}
	
}
