namespace $ {
	
	export let $mol_wire_auto_sub: $mol_wire_sub | null = null
	
	/**
	 * When fulfilled, all publishers are promoted to this subscriber on access to its.
	 */
	export function $mol_wire_auto( next = $mol_wire_auto_sub ) {
		return $mol_wire_auto_sub = next
	}
	
	/**
	 * Affection queue. Used to prevent accidental stack overflow on emit.
	 */
	export const $mol_wire_affected = [] as ( $mol_wire_sub | number )[]
	
}
