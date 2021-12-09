namespace $ {
	
	export function $mol_wait_timeout_async( this: $, timeout: number ) {
		return new Promise( done => {
			new this.$mol_after_timeout( timeout , ()=> done( null ) )
		} )
	}
	
	export function $mol_wait_timeout( this: $, timeout: number ) {
		return this.$mol_wire_sync( this ).$mol_wait_timeout_async( timeout )
	}
	
}
