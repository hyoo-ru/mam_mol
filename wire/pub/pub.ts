namespace $ {

	/**
	 * Collects subscribers in compact array. 24B
	 */
	export class $mol_wire_pub extends Array< $mol_wire_pub | number > {
		
		// Derived objects should be Arrays.
		static get [ Symbol.species ]() {
			return Array
		}
		
		static affected = [] as ( $mol_wire_sub | number )[]
		
		protected subs_from = 0 // 4B
		
		get subs() {
			const res = [] as $mol_wire_sub[]
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				res.push( this[i] as $mol_wire_sub )
			}
			return res
		}
		
		// get affection() {
		// 	const queue = [ this ] as $mol_wire_pub[]
		// 	const res = [] as typeof queue
		// 	while( queue.length ) {
		// 		const next = queue.pop() as any as $mol_wire_sub
		// 		if( next['cursor'] === $mol_wire_cursor.fresh ) continue
		// 		if( next['cursor'] ) res.push( next )
		// 		queue.push(... next.subs )
		// 	}
		// 	return res
		// }
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		on( sub: $mol_wire_pub, sub_pos: number ) {
			const pos = this.length
			this.push( sub, sub_pos )
			return pos
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		off( sub_pos: number ) {
			
			if(!( sub_pos < this.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.length - 2
			if( sub_pos !== end ) {
				this.move( end, sub_pos )
			}
			
			this.pop()
			this.pop()
			
			if( this.length === this.subs_from ) this.reap()
			
		}
		
		/**
		 * Called when last sub was unsubscribed.
		 **/
		reap() { }
		
		/**
		 * Autowire this publisher with current subscriber.
		 **/
		promote() {
			$mol_wire_auto?.next( this )
		}
		
		/**
		 * Enforce actualization. Should not throw errors.
		 */
		touch() {}
		
		/**
		 * Notify subscribers about self changes.
		 */
		emit() {
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				;( this[i] as $mol_wire_pub ).stale()
			}
		}
		
		/**
		 * Receive notification about publisher changes.
		 */
		stale() {
			
			if( !this.affect( $mol_wire_cursor.stale ) ) return false
			
			while( $mol_wire_pub.affected.length ) {
				const next = $mol_wire_pub.affected.pop()! as $mol_wire_sub
				next.affect( $mol_wire_cursor.doubt )
			}
			
			return true
		}
		
		/**
		 * Add self subscribers to affection queue.
		 */
		affect( quant: number ) {
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				const sub = this[i] as $mol_wire_sub
				//if( typeof sub !== 'object' ) return $mol_fail( new Error( 'Wrong sub' ) )
				$mol_wire_pub.affected.push( sub )
			}
			return true
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		move( from_pos: number, to_pos: number ) {
			
			const peer = this[ from_pos ] as $mol_wire_pub
			const self_pos = this[ from_pos + 1 ] as number
			
			//if( typeof peer !== 'object' ) return $mol_fail( new Error( 'Wrong peer' ) )
			//if( typeof self_pos !== 'number' ) return $mol_fail( new Error( 'Wrong self_pos' ) )
			
			this[ to_pos ] = peer
			this[ to_pos + 1 ] = self_pos
			
			peer.repos( self_pos, to_pos )
		}
		
		/**
		 * Updates self position in the peer.
		 */
		repos( peer_pos: number, self_pos: number ) {
			//if( typeof peer_pos !== 'number' ) return $mol_fail( new Error( 'Wrong peer_pos' ) )
			//if( typeof self_pos !== 'number' ) return $mol_fail( new Error( 'Wrong self_pos' ) )
			//if( typeof this[ peer_pos ] !== 'object' ) return $mol_fail( new Error( 'Wrong back link' ) )
			//if( this[ peer_pos ][ self_pos ] !== this ) return $mol_fail( new Error( 'Inconsistent back link' ) )
			this[ peer_pos + 1 ] = self_pos
		}
		
		/**
		 * Has any subscribers or not.
		 */
		get alone() {
			return this.subs_from === this.length
		}
		
	}
	
}
