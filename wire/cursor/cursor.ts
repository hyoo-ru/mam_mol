namespace $ {
	
	/** Special status statuses. */
	export enum $mol_wire_cursor {
		
		/** Update required. */
		stale = -1,
		
		/** Some of (transitive) pub update required. */
		doubt = -2,
		
		/** Actual state but may be dropped. */
		fresh = -3,
		
		/** State will never be changed. */
		final = -4,
		
	}
	
}
