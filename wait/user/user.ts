namespace $ {
	
	export function $mol_wait_user_async( this: $ ) {
		return new Promise( done => $mol_dom.addEventListener( 'click', function onclick() {
			$mol_dom.removeEventListener( 'click', onclick )
			done( null )
		} ) )
	}
	
	export function $mol_wait_user( this: $ ) {
		return this.$mol_wire_sync( this ).$mol_wait_user_async()
	}
	
}
