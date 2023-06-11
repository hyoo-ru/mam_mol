namespace $ {
	
	/** Generic subscriber interface */
	export interface $mol_wire_sub extends $mol_wire_pub {
		
		temp: boolean
		
		/**
		 * Begin auto wire to publishers.
		 * Returns previous auto subscriber that must me transfer to the `end`.
		 */
		track_on(): $mol_wire_sub | null

		/**
		 * Returns next auto wired publisher. It can be easely repormoted.
		 * Or promotes next publisher to auto wire its togeter.
		 * Must be used only between `track_on` and `track_off`.
		 */
		track_next( pub?: $mol_wire_pub ): $mol_wire_pub | null
		
		pub_off( pub_pos: number ): void
		
		/**
		 * Unsubscribes from unpromoted publishers.
		 */
		track_cut( sub: $mol_wire_pub | null ): void
		
		/**
		 * Ends auto wire to publishers.
		 */
		track_off( sub: $mol_wire_pub | null ): void
		
		/**
		 * Receive notification about publisher changes.
		 */
		absorb( quant: $mol_wire_cursor ): void
		
		/**
		 * Unsubscribes from all publishers.
		 */
		destructor(): void
		
	}
	
}
