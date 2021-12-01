namespace $ {
	
	/**
	 * When fulfilled, all publishers are promoted to this subscriber on access to its.
	 */
	export let $mol_wire: $mol_wire_sub | null = null
	
	/** Update required. */
	export const $mol_wire_stale = new ( class Stale extends Number {} )( -1 ) as any as number
	
	/** Some of (transitive) pub update required. */
	export const $mol_wire_doubt = new ( class Doubt extends Number {} )( -2 ) as any as number
	
	/** Actual state but may be dropped. */
	export const $mol_wire_fresh = new ( class Fresh extends Number {} )( -3 ) as any as number
	
	/** Long life actual state. */
	export const $mol_wire_solid = new ( class Solid extends Number {} )( -4 ) as any as number
	
	export const $mol_wire_queue = [] as $mol_wire_sub[]
	
}
