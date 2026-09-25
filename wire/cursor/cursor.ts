namespace $ {
	
	/** Special status statuses. The lesser value, the stabler state. */
	export enum $mol_wire_cursor {
		
		/** Update required. */
		stale = -1,
		
		/** Doubt check in progress, so any incoming quant is noticeable. */
		check = -2,
		
		/** Some of (transitive) pub update required. */
		doubt = -3,
		
		/** Actual state but may be dropped. */
		fresh = -4,
		
		/** State will never be changed. */
		final = -5,
		
	}
	
}
