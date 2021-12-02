namespace $ {
	
	/**
	 * When fulfilled, all publishers are promoted to this subscriber on access to its.
	 */
	export let $mol_wire_auto: $mol_wire_sub | null = null
	export const $mol_wire_queue = [] as ( $mol_wire_sub | number )[]
	
	/** Freshness status. */
	export enum $mol_wire_status {
		
		/** Update required. */
		stale = new ( class stale extends Number {} )( -1 ) as any as number,
		
		/** Some of (transitive) pub update required. */
		doubt = new ( class doubt extends Number {} )( -2 ) as any as number,
		
		/** Actual state but may be dropped. */
		fresh = new ( class fresh extends Number {} )( -3 ) as any as number,
		
		/** Long life actual state. */
		solid = new ( class solid extends Number {} )( -4 ) as any as number,
		
	}
	
}
