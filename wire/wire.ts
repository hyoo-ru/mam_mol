namespace $ {
	
	/**
	 * When fulfilled, all publishers are promoted to this subscriber on access to its.
	 */
	export let $mol_wire_auto: $mol_wire_sub | null = null
	
	/**
	 * Affection queue. Used to prevent accidental stack overflow on emit.
	 */
	export const $mol_wire_affected = [] as ( $mol_wire_sub | number )[]
	
}
