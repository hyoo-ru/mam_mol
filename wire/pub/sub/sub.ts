namespace $ {
	
	/**
	 * Publisher that can auto collect other publishers. 32B
	 * 
	 * 	P1 P2 P3 P4 S1 S2 S3
	 * 	^           ^
	 * 	pubs_from   subs_from
	 */
	export class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
		
		protected pub_from = 0 // 4B
		protected cursor = $mol_wire_cursor.stale // 4B
		
		get temp() {
			return false
		}
		
		get pub_list() {
			const res = [] as $mol_wire_pub[]
			const max = this.cursor >=0 ? this.cursor : this.sub_from
			for( let i = this.pub_from; i < max; i += 2 ) {
				if( this.data[i] ) res.push( this.data[i] as $mol_wire_pub )
			}
			return res
		}
		
		track_on() {
			this.cursor = this.pub_from
			const sub = $mol_wire_auto()
			$mol_wire_auto( this )
			return sub
		}
		
		promote() {
			
			if( this.cursor >= this.pub_from ) {
				$mol_fail( new Error( 'Circular subscription' ) )
			}
			
			super.promote()
		}
		
		track_next( pub?: $mol_wire_pub ): $mol_wire_pub | null {
			
			if( this.cursor < 0 ) $mol_fail( new Error( 'Promo to non begun sub' ) )
			
			if( this.cursor < this.sub_from ) {
			
 				const next = this.data[ this.cursor ] as $mol_wire_pub | undefined
				if( pub === undefined ) return next ?? null
				
				if( next === pub ) {
					this.cursor += 2
					return next
				}
				
				if( next ) {
					
					if( this.sub_from < this.data.length ) {
						this.peer_move( this.sub_from, this.data.length )
					}
					
					this.peer_move( this.cursor, this.sub_from )
					this.sub_from += 2
					
				}
				
			} else {
				
				if( pub === undefined ) return null
				
				if( this.sub_from < this.data.length ) {
					this.peer_move( this.sub_from, this.data.length )
				}
				
				this.sub_from += 2
				
			}			
			
			this.data[ this.cursor ] = pub
			this.data[ this.cursor + 1 ] = pub.sub_on( this, this.cursor )
			
			this.cursor += 2
			
			return pub
		}
		
		track_off( sub: $mol_wire_sub | null ) {
			
			$mol_wire_auto( sub )
			
			if( this.cursor < 0 ) {
				$mol_fail( new Error( 'End of non begun sub' ) )
			}
			
			for(
				let cursor = this.pub_from;
				cursor < this.cursor;
				cursor += 2
			) {
				const pub = this.data[ cursor ] as $mol_wire_pub
				pub.fresh()
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
		}
		
		pub_off( sub_pos: number ) {
			this.data[ sub_pos ] = undefined as any
			this.data[ sub_pos + 1 ] = undefined as any 
		}
		
		destructor() {
			
			for(
				let cursor = this.data.length - 2;
				cursor >= this.sub_from;
				cursor -= 2
			) {
				const sub = this.data[ cursor ] as $mol_wire_sub
				const pos = this.data[ cursor + 1 ] as number
				sub.pub_off( pos )
			}
			
			this.data.length = this.sub_from 
			this.cursor = this.pub_from
			this.track_cut()
			this.cursor = $mol_wire_cursor.stale
			
		}
		
		track_cut() {
			
			if( this.cursor < this.pub_from ) {
				$mol_fail( new Error( 'Cut of non begun sub' ) )
			}
			
			let end = this.data.length
			
			for(
				let cursor = this.cursor;
				cursor < this.sub_from;
				cursor += 2
			) {
				
				const pub = this.data[ cursor ] as $mol_wire_pub | undefined
				pub?.sub_off( this.data[ cursor + 1 ] as number )
				
				end -= 2
				if( this.sub_from <= end ) this.peer_move( end, cursor )
				
			}
			
			this.data.length = end
			
			this.sub_from = this.cursor
			
		}
		
		complete() { }
		
		complete_pubs() {
			
			const limit = this.cursor < 0 ? this.sub_from : this.cursor 
			
			for(
				let cursor = this.pub_from;
				cursor < limit;
				cursor += 2
			) {
				const pub = this.data[ cursor ] as $mol_wire_pub
				if( pub?.incompleted ) return 
			}
			
			for(
				let cursor = this.pub_from;
				cursor < limit;
				cursor += 2
			) {
				const pub = this.data[ cursor ] as $mol_wire_pub
				pub?.complete()
			}
			
		}

		absorb( quant = $mol_wire_cursor.stale, pos = -1 ) {
			
			if( this.cursor === $mol_wire_cursor.final ) return
			if( this.cursor >= quant ) return
			
			this.cursor = quant
			this.emit( $mol_wire_cursor.doubt )
			
			// if( pos >= 0 && pos < this.sub_from - 2 ) {
				
			// 	const pub = this.data[ pos ] as $mol_wire_pub
			// 	if( pub instanceof $mol_wire_task ) return
				
			// 	for(
			// 		let cursor = this.pub_from;
			// 		cursor < this.sub_from;
			// 		cursor += 2
			// 	) {
					
			// 		const pub = this.data[ cursor ] as $mol_wire_pub
					
			// 		if( pub instanceof $mol_wire_task ) {
			// 			pub.destructor()
			// 		}
					
			// 	}
				
			// }
			
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_native( this )
		}
		
		/**
		 * Is subscribed to any publisher or not.
		 */
		get pub_empty() {
			return this.sub_from === this.pub_from
		}
		
	}
	
}
