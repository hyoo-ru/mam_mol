namespace $ {
	
	/**
	 * When fulfilled, all publishers are promoted to this subscriber on access to its.
	 */
	export let $mol_wire_auto: $mol_wire_sub | null = null
	export const $mol_wire_queue = [] as ( $mol_wire_sub | number )[]
	
}
