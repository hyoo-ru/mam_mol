namespace $ {
	
	/** Special status statuses. */
	export enum $mol_wire_cursor {
		
		/** Update required. */
		stale = new ( class stale extends Number { toString(){ return '🔴' } } )( -1 ) as any as number,
		
		/** Some of (transitive) pub update required. */
		doubt = new ( class doubt extends Number { toString(){ return '🟡' } } )( -2 ) as any as number,
		
		/** Actual state but may be dropped. */
		fresh = new ( class fresh extends Number { toString(){ return '🟢' } } )( -3 ) as any as number,
		
		/** State will never be changed. */
		final = new ( class solid extends Number { toString(){ return '🔵' } } )( -4 ) as any as number,
		
	}
	
}
