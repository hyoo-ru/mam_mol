namespace $ {
	
	/**
	 * Publisher that can auto collect other publishers. 32B
	 * 
	 * 	P1 P2 P3 P4 P5 P6 S1 S2 S3
	 * 	   ^              ^
	 * 	   pubs_cursor    subs_from
	 */
	export class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
		
		protected pubs_cursor = $mol_wire_stale // 4B
		
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
			const sub = $mol_wire
			$mol_wire = this
			return sub
		}
		
		promo() {
			
			if( this.pubs_cursor >= 0 ) {
				$mol_fail( new Error( 'Circular subscription' ) )
			}
			
			$mol_wire?.next( this )
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
			
			for(
				let cursor = this.pubs_cursor;
				cursor < this.subs_from;
				cursor += 2
			) {
				
				const pub = this[ cursor ] as $mol_wire_pub
				pub.off( this[ cursor + 1 ] as number )
				
				if( this.subs_from < this.length ) {
					this.move( cursor, this.length - 2 )
				}
				
			}
			
			const count = this.pubs_cursor + this.length - this.subs_from
			while( this.length > count ) {
				this.pop()
				this.pop()
			}
			
			this.subs_from = this.pubs_cursor
			
			$mol_wire = sub
			
			this.pubs_cursor = $mol_wire_fresh
			
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
