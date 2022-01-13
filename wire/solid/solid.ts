namespace $ {
	
	/**
	 * Disable reaping of current subscriber
	 */
	export function $mol_wire_solid() {
		$mol_wire_auto!.reap = nothing
	}
	
	const nothing = ()=> {}
	
}
