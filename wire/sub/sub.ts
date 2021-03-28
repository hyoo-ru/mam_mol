namespace $ {
	
	/**
	 * Auto collects publishers
	 */
	export class $mol_wire_sub extends $mol_wire_pub implements $mol_wire_pub {
		
		protected wire_pubs_cursor = -1
		
		/**
		 * Begin auto wire to publishers.
		 */
		wire_begin() {
			this.wire_pubs_cursor = 0
			const sub = $mol_wire
			$mol_wire = this
			return sub
		}
		
		wire_next() {
			if( this.wire_pubs_cursor >= this.wire_subs_from ) return null
			return this.wire_peers[ this.wire_pubs_cursor ]
		}
		
		/**
		 * Pomote publisher to wire its togeter.
		 */
		wire_promo( pub: $mol_wire_pub ) {
			
			if( this.wire_pubs_cursor < this.wire_subs_from ) {
			
 				const next = this.wire_peers[ this.wire_pubs_cursor ]
				
				if( next === pub ) {
					++ this.wire_pubs_cursor
					return
				}

				next.wire_off( this.wire_pos[ this.wire_pubs_cursor ] )
				
			} else {
				
				if( this.wire_subs_from < this.wire_peers.length ) {
					this.wire_move( this.wire_subs_from, this.wire_peers.length )
				}
				
				++ this.wire_subs_from
				
			}			
			
			this.wire_peers[ this.wire_pubs_cursor ] = pub
			this.wire_pos[ this.wire_pubs_cursor ] = pub.wire_on( this as $mol_wire_pub, this.wire_pubs_cursor )
			
			++ this.wire_pubs_cursor
		}
		
		/**
		 * Ends auto wire to publishers and unsubscribes from unpromoted publishers.
		 */
		wire_end( sub: $mol_wire_pub | null ) {
			
			let tail = 0
			
			for(
				let cursor = this.wire_pubs_cursor;
				cursor < this.wire_subs_from;
				++ cursor
			) {
				
				const pub = this.wire_peers[ cursor ]
				pub.wire_off( this.wire_pos[ cursor ] )
				
				if( this.wire_subs_from < this.wire_peers.length ) {
					pub.wire_move( cursor, this.wire_peers.length - 1 )
				} else {
					++ tail
				}
				
			}
			
			const count = this.wire_pubs_cursor + this.wire_peers.length - this.wire_subs_from
			while( this.wire_peers.length > count ) this.wire_peers.pop()
			
			this.wire_subs_from = this.wire_pubs_cursor
			
			$mol_wire = sub
			
		}
		
		/**
		 * Handles events from publishers.
		 */
		wire_absorb( quant: unknown ) { }
		
	}
	
}
