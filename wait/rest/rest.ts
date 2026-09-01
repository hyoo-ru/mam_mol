namespace $ {
	
	export function $mol_wait_rest_async( this: $ ) {
		return new Promise( done => {
			new this.$mol_after_work( 16 , ()=> done( null ) )
		} )
	}
	
	export function $mol_wait_rest( this: $ ) {
		return this.$mol_wire_sync( this ).$mol_wait_rest_async()
	}
	
}
