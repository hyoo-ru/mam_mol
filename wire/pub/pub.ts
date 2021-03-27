namespace $ {
	
	/**
	 * Common interface of all subscribers.
	 */
	export type $mol_wire_pub_sub = {
		
		/**
		 * Returns next publisher in this subscriber.
		 * Can be user to reuse an existen publisher instead of creating new.
		 */
		wire_next(): $mol_wire_pub | null
		
		/**
		 * Promote new publisher to subscriber.
		 */
		wire_promo< Pub extends $mol_wire_pub >( pub: Pub ): Pub
		
		/**
		 * Notify about changes in the provider.
		 */
		wire_absorb( quant?: unknown ): void
		
		/**
		 * Notify about changes subscriber position in the publisher
		 */
		wire_sub_repos( pub_pos: number, sub_pos: number ): void
		
	}
	
	/**
	 * Collects subscribers in compact array.
	 * Use `$mol_wire_auto?.promo( pub )` to auto wire.
	 */
	export class $mol_wire_pub extends $mol_object2 {
		
		protected wire_subs = [] as $mol_wire_pub_sub[]
		protected wire_subs_pos = [] as number[]
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		wire_on( sub: $mol_wire_pub_sub, sub_pos: number ) {
			const pos = this.wire_subs.length
			this.wire_subs[ pos ] = sub
			this.wire_subs_pos[ pos ] = sub_pos
			return pos
		}
		
		/**
		 * Notify subscribers about something.
		 */
		wire_emit( quant: unknown = this ) {
			for( const sub of this.wire_subs ) {
				sub?.wire_absorb( quant )
			}
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		wire_off( sub_pos: number ) {
			
			if(!( sub_pos < this.wire_subs.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.wire_subs.length - 1
			if( sub_pos !== end ) {
				const sub = this.wire_subs[ end ]
				this.wire_subs[ sub_pos ] = sub
				this.wire_subs_pos[ sub_pos ] = this.wire_subs_pos[ end ]
				sub.wire_sub_repos( end, sub_pos )
			}
			
			this.wire_subs.pop()
			this.wire_subs_pos.pop()
			
		}
		
	}
	
}
