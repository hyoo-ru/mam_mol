namespace $ {
	
	/**
	 * Collects subscribers in compact array. 28B
	 */
	export class $mol_wire_pub extends Array< unknown > {
		
		// Derived objects should be Arrays.
		static get [ Symbol.species ]() {
			return Array
		}
		
		/**
		 * Index of first subscriber.
		 */
		protected sub_from = 0 // 4B
		
		/**
		 * All current subscribers.
		 */
		get sub_list() {
			const res = [] as $mol_wire_sub[]
			for( let i = this.sub_from; i < this.length; i += 2 ) {
				res.push( this[i] as $mol_wire_sub )
			}
			return res as readonly $mol_wire_sub[]
		}
		
		/**
		 * Has any subscribers or not.
		 */
		get sub_empty() {
			return this.sub_from === this.length
		}
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		sub_on( sub: $mol_wire_pub, pub_pos: number ) {
			const pos = this.length
			this.push( sub, pub_pos )
			return pos
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		sub_off( sub_pos: number ) {
			
			if(!( sub_pos < this.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.length - 2
			if( sub_pos !== end ) {
				this.peer_move( end, sub_pos )
			}
			
			this.pop()
			this.pop()
			
			if( this.length === this.sub_from ) this.reap()
			
		}
		
		/**
		 * Called when last sub was unsubscribed.
		 **/
		reap() { }
		
		/**
		 * Autowire this publisher with current subscriber.
		 **/
		promote() {
			$mol_wire_auto?.track_next( this )
		}
		
		/**
		 * Enforce actualization. Should not throw errors.
		 */
		up() {}
		
		/**
		 * Subscriber stabilized and allows to free.
		 */
		down() {}
		
		/**
		 * Notify subscribers about self changes.
		 */
		emit( quant = $mol_wire_cursor.stale ) {
			for( let i = this.sub_from; i < this.length; i += 2 ) {
				;( this[i] as $mol_wire_sub ).absorb( quant )
			}
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		peer_move( from_pos: number, to_pos: number ) {
			
			const peer = this[ from_pos ] as $mol_wire_pub
			const self_pos = this[ from_pos + 1 ] as number
			
			this[ to_pos ] = peer
			this[ to_pos + 1 ] = self_pos
			
			peer.peer_repos( self_pos, to_pos )
		}
		
		/**
		 * Updates self position in the peer.
		 */
		peer_repos( peer_pos: number, self_pos: number ) {
			this[ peer_pos + 1 ] = self_pos
		}
		
	}
	
}
