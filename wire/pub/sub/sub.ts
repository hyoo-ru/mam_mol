namespace $ {
	
	/**
	 * Publisher that can auto collect other publishers. 32B
	 * 
	 * 	P1 P2 P3 P4 S1 S2 S3
	 * 	^           ^
	 * 	pubs_from   subs_from
	 */
	export class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
		
		protected pubs_from = 0 // 4B
		protected cursor = $mol_wire_cursor.stale // 4B
		
		get pubs() {
			const res = [] as $mol_wire_pub[]
			for( let i = this.pubs_from; i < this.subs_from; i += 2 ) {
				res.push( this[i] as $mol_wire_pub )
			}
			return res
		}
		
		begin() {
			this.cursor = this.pubs_from
			const sub = $mol_wire_auto
			$mol_wire_auto = this
			return sub
		}
		
		promote() {
			
			if( this.cursor >= this.pubs_from ) {
				$mol_fail( new Error( 'Circular subscription' ) )
			}
			
			super.promote()
		}
		
		next( pub?: $mol_wire_pub ): $mol_wire_pub | null {
			
			if( this.cursor < 0 ) $mol_fail( new Error( 'Promo to non begun sub' ) )
			
			if( this.cursor < this.subs_from ) {
			
 				const next = this[ this.cursor ] as $mol_wire_pub | undefined
				if( pub === undefined ) return next ?? null
				
				if( next === pub ) {
					this.cursor += 2
					return next
				}
				
				next?.off( this[ this.cursor + 1 ] as number )
				
			} else {
				
				if( pub === undefined ) return null
				
				if( this.subs_from < this.length ) {
					this.move( this.subs_from, this.length )
				}
				
				this.subs_from += 2
				
			}			
			
			this[ this.cursor ] = pub
			this[ this.cursor + 1 ] = pub.on( this, this.cursor )
			
			this.cursor += 2
			
			return pub
		}
		
		end( sub: $mol_wire_sub | null ) {
			
			$mol_wire_auto = sub
			
			if( this.cursor < 0 ) $mol_fail( new Error( 'End of non begun sub' ) )
			
			this.forget( this.cursor )
			
			for(
				let cursor = this.pubs_from;
				cursor < this.subs_from;
				cursor += 2
			) {
				const pub = this[ cursor ] as $mol_wire_pub
				pub.touch()
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
		}
		
		unsub( sub_pos: number ) {
			this[ sub_pos ] = undefined as any
			this[ sub_pos + 1 ] = undefined as any 
		}
		
		destructor() {
			
			for(
				let cursor = this.length - 2;
				cursor >= this.subs_from;
				cursor -= 2
			) {
				const sub = this[ cursor ] as $mol_wire_sub
				const pos = this[ cursor + 1 ] as number
				sub.unsub( pos )
				this.pop()
				this.pop()
			}
			
			this.forget()
			this.cursor = $mol_wire_cursor.final
			
		}
		
		forget( from = this.pubs_from ) {
			
			let tail = 0
			
			for(
				let cursor = from;
				cursor < this.subs_from;
				cursor += 2
			) {
				
				const pub = this[ cursor ] as $mol_wire_pub | undefined
				pub?.off( this[ cursor + 1 ] as number )
				
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
			
			if( this.cursor >= quant ) return false
			this.cursor = quant
			
			return super.affect( quant )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_native( this )
		}
		
		/**
		 * Is subscribed to any publisher or not.
		 */
		get derived() {
			return this.subs_from === this.pubs_from
		}
		
	}
	
}
