namespace $ {
	
	/**
	 * Disable reaping of current subscriber
	 */
	export function $mol_wire_solid() {
		const current = $mol_wire_auto()
		if( current!.reap !== nothing ) {
			current?.sub_on( sub, sub.data.length )
		}
		current!.reap = nothing
	}
	
	const nothing = ()=> {}
	const sub = new $mol_wire_pub_sub
	
}
