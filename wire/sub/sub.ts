namespace $ {
	
	/**
	 * Auto collects publishers
	 */
	export class $mol_wire_sub extends $mol_wire_pub implements $mol_wire_pub_sub {
		
		protected wire_subs!: $mol_wire_sub[]
		
		protected wire_pubs = [] as $mol_wire_pub[]
		protected wire_pubs_pos = [] as number[]
		protected wire_cursor = -1
		
		/**
		 * Begin auto wire to publishers.
		 */
		wire_begin() {
			this.wire_cursor = 0
			const sub = $mol_wire_auto
			$mol_wire_auto = this
			return sub
		}
		
		wire_next() {
			return this.wire_pubs[ this.wire_cursor ] ?? null
		}
		
		/**
		 * Pomote publisher to wire its togeter.
		 */
		wire_promo< Pub extends $mol_wire_pub >( pub: Pub ): Pub {
			
			const next = this.wire_pubs[ this.wire_cursor ]
				
			if( next ) {
				this.wire_pubs.push( next )
				this.wire_pubs_pos.push( this.wire_pubs_pos[ this.wire_cursor ] )
			}
			
			this.wire_pubs[ this.wire_cursor ] = pub
			this.wire_pubs_pos[ this.wire_cursor ] = pub.wire_on( this, this.wire_cursor )
			
			++ this.wire_cursor
			return pub
		}
		
		/**
		 * Ends auto wire to publishers and unsubscribes from unpromoted publishers.
		 */
		wire_end( sub: $mol_wire_pub_sub | null ) {
			
			while( this.wire_cursor < this.wire_pubs.length ) {
				this.wire_pubs.pop()!.wire_off( this.wire_pubs_pos.pop()! )
			}
			
			$mol_wire_auto = sub
			
		}
		
		/**
		 * Handles events from publishers.
		 */
		wire_absorb( quant: unknown ) { }
		
		/**
		 * Updates position of subscriber in the publisher.
		 */
		wire_sub_repos( pub_pos: number, sub_pos: number ) {
			this.wire_pubs_pos[ pub_pos ] = sub_pos
		}
		
	}
	
}
