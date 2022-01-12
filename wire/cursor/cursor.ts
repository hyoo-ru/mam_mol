namespace $ {
	
	/** Special status statuses. */
	export enum $mol_wire_cursor {
		
		/** Update required. */
		stale = new ( class stale extends Number {} )( -1 ) as any as number,
		
		/** Some of (transitive) pub update required. */
		doubt = new ( class doubt extends Number {} )( -2 ) as any as number,
		
		/** Actual state but may be dropped. */
		fresh = new ( class fresh extends Number {} )( -3 ) as any as number,
		
		/** State will never be changed. */
		final = new ( class solid extends Number {} )( -4 ) as any as number,
		
	}
	
}
