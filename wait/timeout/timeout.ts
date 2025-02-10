namespace $ {
	
	export function $mol_wait_timeout_async( this: $, timeout: number ): Promise< void > {
		const promise = new $mol_promise()
		const task = new this.$mol_after_timeout( timeout , ()=> promise.done() )
		return Object.assign( promise, {
			destructor: ()=> task.destructor()
		} )
	}
	
	export function $mol_wait_timeout( this: $, timeout: number ) {
		return this.$mol_wire_sync( this ).$mol_wait_timeout_async( timeout )
	}
	
}
