namespace $ {
	
	/**
	 * Publisher that can auto collect other publishers. 32B
	 * 
	 * 	P1 P2 P3 P4 P5 P6 S1 S2 S3
	 * 	   ^              ^
	 * 	   pubs_cursor    subs_from
	 */
	export class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
		
		protected pubs_cursor = $mol_wire_status.stale // 4B
		
		get wire_pubs() {
			const res = [] as $mol_wire_pub[]
			for( let i = 0; i < this.subs_from; i += 2 ) {
				res.push( this[i] as $mol_wire_pub )
			}
			return res
		}
		
		get wire_subs() {
			const res = [] as $mol_wire_pub_sub[]
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				res.push( this[i] as $mol_wire_pub_sub )
			}
			return res
		}
		
		begin() {
			this.pubs_cursor = 0
			const sub = $mol_wire_auto
			$mol_wire_auto = this
			return sub
		}
		
		promo() {
			
			if( this.pubs_cursor >= 0 ) {
				$mol_fail( new Error( 'Circular subscription' ) )
			}
			
			$mol_wire_auto?.next( this )
		}
		
		next( pub?: $mol_wire_pub ): $mol_wire_pub | null {
			
			if( this.pubs_cursor < 0 ) $mol_fail( new Error( 'Promo to non begun sub' ) )
			
			if( this.pubs_cursor < this.subs_from ) {
			
 				const next = this[ this.pubs_cursor ] as $mol_wire_pub
				if( pub === undefined ) return next
				
				if( next === pub ) {
					this.pubs_cursor += 2
					return next
				}
				
				next.off( this[ this.pubs_cursor + 1 ] as number )
				
			} else {
				
				if( pub === undefined ) return null
				
				if( this.subs_from < this.length ) {
					this.move( this.subs_from, this.length )
				}
				
				this.subs_from += 2
				
			}			
			
			this[ this.pubs_cursor ] = pub
			this[ this.pubs_cursor + 1 ] = pub.on( this, this.pubs_cursor )
			
			this.pubs_cursor += 2
			
			return pub
		}
		
		end( sub: $mol_wire_sub | null ) {
			
			if( this.pubs_cursor < 0 ) $mol_fail( new Error( 'End of non begun sub' ) )
			
			this.forget( this.pubs_cursor )
			
			for(
				let cursor = 0;
				cursor < this.subs_from;
				cursor += 2
			) {
				const pub = this[ cursor ] as $mol_wire_pub
				pub.touch()
			}
			
			$mol_wire_auto = sub
			this.pubs_cursor = $mol_wire_status.fresh
			
		}
		
		destructor() {
			this.forget()
			this.pubs_cursor = $mol_wire_status.stale
		}
		
		alone() { }
		
		forget( from = 0 ) {
			
			let tail = 0
			
			for(
				let cursor = from;
				cursor < this.subs_from;
				cursor += 2
			) {
				
				const pub = this[ cursor ] as $mol_wire_pub
				pub.off( this[ cursor + 1 ] as number )
				
				if( this.subs_from < this.length ) {
					this.move( this.length - 2, cursor )
					this.pop()
					this.pop()
				} else {
					++ tail
				}
				
			}
			
			for(; tail; -- tail ) {
				this.pop()
				this.pop()
			}
			
			this.subs_from = from
			
		}

		affect( quant: number ) {
			
			if( this.pubs_cursor >= quant ) return false
			this.pubs_cursor = quant
			
			return super.affect( quant )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_native( this )
		}
		
	}
	
}
