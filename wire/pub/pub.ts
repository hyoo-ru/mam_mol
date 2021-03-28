namespace $ {

	// P1 P2 P3 P4 P5 P6 S1 S2 S3
	//    ^              ^
	//    Cursor         Subs From
	
	/**
	 * Collects subscribers in compact array.
	 * Use `$mol_wire_auto?.promo( pub )` to auto wire.
	 */
	export class $mol_wire_pub extends $mol_object2 {
		
		protected wire_peers = [] as $mol_wire_pub[]
		protected wire_pos = [] as number[]
		protected wire_subs_from = 0
		
		/**
		 * Updates self position in the peer.
		 */
		wire_repos( peer_pos: number, self_pos: number ) {
			this.wire_pos[ peer_pos ] = self_pos
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		wire_move( from_pos: number, to_pos: number ) {
			
			const peer = this.wire_peers[ from_pos ]
			const self_pos = this.wire_pos[ from_pos ]
			
			this.wire_peers[ to_pos ] = peer
			this.wire_pos[ to_pos ] = self_pos
			
			peer.wire_repos( self_pos, to_pos )
		}
		
		wire_next() {
			return null as null | $mol_wire_pub
		}
		
		wire_promo( pub: $mol_wire_pub ) {
		}
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		wire_on( sub: $mol_wire_pub, sub_pos: number ) {
			const pos = this.wire_peers.length
			this.wire_peers[ pos ] = sub
			this.wire_pos[ pos ] = sub_pos
			return pos
		}
		
		/**
		 * Notify subscribers about something.
		 */
		wire_emit( quant: unknown = this ) {
			for( let i = this.wire_subs_from; i < this.wire_peers.length; ++i ) {
				this.wire_peers[i]?.wire_absorb( quant )
			}
		}
		
		/**
		 * Notify about changes in the provider.
		 */
		wire_absorb( quant?: unknown ) {}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		wire_off( sub_pos: number ) {
			
			if(!( sub_pos < this.wire_peers.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.wire_peers.length - 1
			if( sub_pos !== end ) {
				this.wire_move( end, sub_pos )
			}
			
			this.wire_peers.pop()
			this.wire_pos.pop()
			
		}
		
	}
	
}
