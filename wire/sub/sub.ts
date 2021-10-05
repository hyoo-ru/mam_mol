namespace $ {
	
	export interface $mol_wire_sub extends $mol_wire_pub {
		
		/**
		 * Begin auto wire to publishers.
		 * Returns previous auto subscriber that must me transfer to the `end`.
		 */
		begin(): $mol_wire_sub | null

		/**
		 * Returns next auto wired publisher. It can be easely repormoted.
		 * Or promotes next publisher to auto wire its togeter.
		 * Must be used only between `begin` and `end`.
		 */
		next( pub?: $mol_wire_pub ): $mol_wire_pub | null
		
		/**
		 * Ends auto wire to publishers and unsubscribes from unpromoted publishers.
		 */
		end( sub: $mol_wire_pub | null ): void
		
	}
	
}
