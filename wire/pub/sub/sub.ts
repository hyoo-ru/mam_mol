namespace $ {
	
	/**
	 * Publisher that can auto collect other publishers. 76B
	 * 
	 * 	P1 P2 P3 P4 P5 P6 S1 S2 S3
	 * 	   ^              ^
	 * 	   pubs_cursor    subs_from
	 */
	export class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
		
		protected wire_pubs_cursor = -1 // 4B
		protected wire_subs_from = 0 // 4B
		
		begin() {
			this.wire_pubs_cursor = 0
			const sub = $mol_wire
			$mol_wire = this
			return sub
		}
		
		promo( pub: $mol_wire_pub ) {
			
			if( this.wire_pubs_cursor < this.wire_subs_from ) {
			
 				const next = this.wire_peers[ this.wire_pubs_cursor ]
				
				if( next === pub ) {
					++ this.wire_pubs_cursor
					return
				}

				next.off( this.wire_pos[ this.wire_pubs_cursor ] )
				
			} else {
				
				if( this.wire_subs_from < this.wire_peers.length ) {
					this.move( this.wire_subs_from, this.wire_peers.length )
				}
				
				++ this.wire_subs_from
				
			}			
			
			this.wire_peers[ this.wire_pubs_cursor ] = pub
			this.wire_pos[ this.wire_pubs_cursor ] = pub.on( this as $mol_wire_pub, this.wire_pubs_cursor )
			
			++ this.wire_pubs_cursor
		}
		
		next() {
			if( this.wire_pubs_cursor >= this.wire_subs_from ) return null
			return this.wire_peers[ this.wire_pubs_cursor ]
		}
		
		end( sub: $mol_wire_sub | null ) {
			
			let tail = 0
			
			for(
				let cursor = this.wire_pubs_cursor;
				cursor < this.wire_subs_from;
				++ cursor
			) {
				
				const pub = this.wire_peers[ cursor ]
				pub.off( this.wire_pos[ cursor ] )
				
				if( this.wire_subs_from < this.wire_peers.length ) {
					pub.move( cursor, this.wire_peers.length - 1 )
				} else {
					++ tail
				}
				
			}
			
			const count = this.wire_pubs_cursor + this.wire_peers.length - this.wire_subs_from
			while( this.wire_peers.length > count ) this.wire_peers.pop()
			
			this.wire_subs_from = this.wire_pubs_cursor
			
			$mol_wire = sub
			
		}
		
		emit( quant: unknown = this ) {
			for( let i = this.wire_subs_from; i < this.wire_peers.length; ++i ) {
				this.wire_peers[i].absorb( quant )
			}
		}
		
	}
	
}
