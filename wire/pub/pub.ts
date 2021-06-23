namespace $ {

	/**
	 * Collects subscribers in compact array.
	 * Use `$mol_wire_auto?.promo( pub )` to auto wire.
	 */
	export class $mol_wire_pub extends $mol_object2 {
		
		protected wire_peers = [] as $mol_wire_pub[]
		protected wire_pos = [] as number[]
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		on( sub: $mol_wire_pub, sub_pos: number ) {
			const pos = this.wire_peers.length
			this.wire_peers[ pos ] = sub
			this.wire_pos[ pos ] = sub_pos
			return pos
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		off( sub_pos: number ) {
			
			if(!( sub_pos < this.wire_peers.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.wire_peers.length - 1
			if( sub_pos !== end ) {
				this.move( end, sub_pos )
			}
			
			this.wire_peers.pop()
			this.wire_pos.pop()
			
		}
		
		/**
		 * Notify subscribers about something.
		 */
		emit( quant: unknown = this ) {
			for( let i = 0; i < this.wire_peers.length; ++i ) {
				this.wire_peers[i].absorb( quant )
			}
		}
		
		/**
		 * Notify about changes in the publisher.
		 */
		absorb( quant?: unknown ) {
			this.emit( quant )
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		move( from_pos: number, to_pos: number ) {
			
			const peer = this.wire_peers[ from_pos ]
			const self_pos = this.wire_pos[ from_pos ]
			
			this.wire_peers[ to_pos ] = peer
			this.wire_pos[ to_pos ] = self_pos
			
			peer.repos( self_pos, to_pos )
		}
		
		/**
		 * Updates self position in the peer.
		 */
		 repos( peer_pos: number, self_pos: number ) {
			this.wire_pos[ peer_pos ] = self_pos
		}
		
	}
	
}
