namespace $ {
	
	/**
	 * Common interface of all subscribers.
	 */
	export type $mol_wire_pub_sub = {
		
		/**
		 * Promote new publisher to subscriber.
		 */
		promo( pub: $mol_wire_pub ): void
		
		/**
		 * Notify about changes in the provider.
		 */
		stale( pub_pos: number ): void
		
		/**
		 * Notify about changes subscriber position
		 */
		repos( pub_pos: number, sub_pos: number ): void
		
	}
	
	/**
	 * Collects subscribers in compact array.
	 * Use `$mol_wire_auto?.promo( pub )` to auto wire.
	 */
	export class $mol_wire_pub {
		
		protected subscribers = [] as $mol_wire_pub_sub[]
		protected subscribers_pos = [] as number[]
		
		/**
		 * Ability to reuse an existen publisher at same position.
		 */
		reuse( pub: $mol_wire_pub ) {
			return this
		}
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		on( sub: $mol_wire_pub_sub, sub_pos: number ) {
			const pos = this.subscribers.length
			this.subscribers[ pos ] = sub
			this.subscribers_pos[ pos ] = sub_pos
			return pos
		}
		
		/**
		 * Notify subscribers about changes.
		 */
		emit() {
			for( const [ index, sub ] of this.subscribers.entries() ) {
				sub?.stale( this.subscribers_pos[ index ] )
			}
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		off( pos: number ) {
			
			if(!( pos < this.subscribers.length )) {
				$mol_fail( new Error( `Wrong pos ${ pos }` ) )
			}
			
			const end = this.subscribers.length - 1
			if( pos !== end ) {
				const sub = this.subscribers[ end ]
				this.subscribers[ pos ] = sub
				this.subscribers_pos[ pos ] = this.subscribers_pos[ end ]
				sub.repos( end, pos )
			}
			
			this.subscribers.pop()
			this.subscribers_pos.pop()
			
		}
		
	}
	
}
