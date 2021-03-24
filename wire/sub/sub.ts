namespace $ {
	
	const enum $mol_wire_sub_status {
		stale = -1,
		doubt = -2,
		fresh = -3,
	}
	
	/**
	 * Auto collects publishers
	 */
	export class $mol_wire_sub extends $mol_wire_pub implements $mol_wire_pub_sub {
		
		protected subscribers!: $mol_wire_sub[]
		
		protected publishers = [] as $mol_wire_pub[]
		protected publishers_pos = [] as number[]
		protected cursor = $mol_wire_sub_status.stale
		
		/**
		 * Begin auto wire to publishers.
		 */
		begin() {
			this.cursor = 0
			const sub = $mol_wire_auto
			$mol_wire_auto = this
			return sub
		}
		
		/**
		 * Pomote publisher to wire its togeter.
		 */
		promo( pub: $mol_wire_pub ) {
			
			const next = this.publishers[ this.cursor ]
				
			if( next ) {
				
				pub = pub.reuse( next )
				if( pub === next ) {
					++ this.cursor
					return next
				} else {
					this.publishers.push( next )
					this.publishers_pos.push( this.publishers_pos[ this.cursor ] )
				}
				
			}
			
			this.publishers[ this.cursor ] = pub
			this.publishers_pos[ this.cursor ] = pub.on( this, this.cursor )
			
			++ this.cursor
			return pub
		}
		
		/**
		 * Ends auto wire to publishers and unsubscribes from unpromoted publishers.
		 */
		end( sub: $mol_wire_pub_sub | null ) {
			
			while( this.cursor < this.publishers.length ) {
				this.publishers.pop()!.off( this.publishers_pos.pop()! )
			}
			
			this.cursor = $mol_wire_sub_status.fresh
			$mol_wire_auto = sub
			
		}
		
		/**
		 * Updates position of subscriber in the publisher.
		 */
		repos( pub_pos: number, sub_pos: number ) {
			this.publishers_pos[ pub_pos ] = sub_pos
		}
		
		/**
		 * Marks as stale and informs that subscribers may be staled too.
		 */
		stale( pub_pos: number ) {
			
			if( this.cursor <= $mol_wire_sub_status.stale ) return
			this.cursor = $mol_wire_sub_status.stale
			
			for( const [ index, sub ] of this.subscribers.entries() ) {
				sub?.doubt( this.subscribers_pos[ index ] )
			}
			
		}
			
		/**
		 * Marks as doubt and retranslates doubt to subscribers.
		 */
		 doubt( pub_pos: number ) {
			
			if( this.cursor <= $mol_wire_sub_status.doubt ) return
			this.cursor = $mol_wire_sub_status.doubt
			
			for( const [ index, sub ] of this.subscribers.entries() ) {
				sub?.doubt( this.subscribers_pos[ index ] )
			}
			
		}
		
	}
	
}
