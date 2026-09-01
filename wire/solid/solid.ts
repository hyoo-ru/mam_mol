namespace $ {
	
	/**
	 * Disable reaping of current subscriber
	 */
	export function $mol_wire_solid() {
		let current = $mol_wire_auto() as $mol_wire_fiber< any, any, any >
		if( current!.temp ) current = current!.host
		if( current!.reap !== nothing ) {
			current?.sub_on( sub, sub.data.length )
		}
		current!.reap = nothing
	}
	
	const nothing = ()=> {}
	const sub = new $mol_wire_pub_sub
	
}
