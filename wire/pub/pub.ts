namespace $ {
	
	/**
	 * Collects subscribers in compact array. 28B
	 */
	export class $mol_wire_pub extends Object {
		
		constructor( id = `$mol_wire_pub:${ $mol_guid() }` ) {
			super()
			this[ Symbol.toStringTag ] = id
		}
		
		[ Symbol.toStringTag ]!: string
		data = [] as unknown[]
		
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
			for( let i = this.sub_from; i < this.data.length; i += 2 ) {
				res.push( this.data[i] as $mol_wire_sub )
			}
			return res as readonly $mol_wire_sub[]
		}
		
		/**
		 * Has any subscribers or not.
		 */
		get sub_empty() {
			return this.sub_from === this.data.length
		}
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		sub_on( sub: $mol_wire_pub, pub_pos: number ) {
			const pos = this.data.length
			this.data.push( sub, pub_pos )
			return pos
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		sub_off( sub_pos: number ) {
			
			if(!( sub_pos < this.data.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.data.length - 2
			if( sub_pos !== end ) {
				this.peer_move( end, sub_pos )
			}
			
			this.data.length = end
			
			if( end === this.sub_from ) this.reap()
			
		}
		
		/**
		 * Called when last sub was unsubscribed.
		 **/
		reap() { }
		
		/**
		 * Autowire this publisher with current subscriber.
		 **/
		promote() {
			$mol_wire_auto()?.track_next( this )
		}
		
		/**
		 * Enforce actualization. Should not throw errors.
		 */
		fresh() {}
		
		/**
		 * Allow to put data to caches in the subtree.
		 */
		complete() {}
		
		get incompleted() {
			return false
		}
		
		/**
		 * Notify subscribers about self changes.
		 */
		emit( quant = $mol_wire_cursor.stale ) {
			for( let i = this.sub_from; i < this.data.length; i += 2 ) {
				;( this.data[i] as $mol_wire_sub ).absorb( quant, this.data[ i + 1 ] as number )
			}
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		peer_move( from_pos: number, to_pos: number ) {
			
			const peer = this.data[ from_pos ] as $mol_wire_pub
			const self_pos = this.data[ from_pos + 1 ] as number
			
			this.data[ to_pos ] = peer
			this.data[ to_pos + 1 ] = self_pos
			
			peer.peer_repos( self_pos, to_pos )
		}
		
		/**
		 * Updates self position in the peer.
		 */
		peer_repos( peer_pos: number, self_pos: number ) {
			this.data[ peer_pos + 1 ] = self_pos
		}
		
	}
	
}
