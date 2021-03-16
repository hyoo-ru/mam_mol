namespace $ {
	
	/** CROWD Ordered Set */
	export class $mol_crowd_list extends $mol_crowd_store {
		
		protected version = 0
		protected readonly array = [] as $mol_crowd_delta_value[]
		protected readonly stamps = new Map< $mol_crowd_delta_value, number >()
		
		get items() {
			return this.array.slice() as readonly $mol_crowd_delta_value[]
		}
		
		has( val: $mol_crowd_delta_value ) {
			return this.stamps.get( val )! > 0
		}
		
		version_item( val: $mol_crowd_delta_value ) {
			return Math.abs( this.stamps.get( val ) ?? 0 )
		}
		
		version_feed( version: number ) {
			
			this.stamper.feed( version )
			
			if( version <= this.version ) return
			this.version = version
			
		}
		
		toJSON( version_min = 0 ): ReturnType< typeof $mol_crowd_delta > {
			
			const delta = $mol_crowd_delta([],[])
			if( this.version <= version_min ) return delta
			
			for( const key of this.array ) {
				delta.values.push( key )
				delta.stamps.push( this.stamps.get( key )! )
			}
			
			for( const [ key, stamp ] of this.stamps ) {
				if( stamp > 0 ) continue
				delta.values.push( key )
				delta.stamps.push( stamp )
			}
			
			return delta
		}
		
		insert(
			key: $mol_crowd_delta_value,
			pos: number = this.array.length,
		) {
			
			const exists = this.array[ pos ]
			if( exists === key ) return this
			
			const delta = $mol_crowd_delta([],[])
				
			if( pos > 0 ) {
				const anchor = this.array[ pos - 1 ]
				delta.values.push( anchor )
				delta.stamps.push( this.stamps.get( anchor )! )
			}
			
			delta.values.push( key )
			delta.stamps.push( this.stamper.genegate() )
				
			this.apply( delta )
			
			return this
		}
		
		cut(
			key: $mol_crowd_delta_value
		) {
			
			const stamp = this.stamps.get( key ) ?? 0
			if( stamp <= 0 ) return this
			
			this.apply( $mol_crowd_delta(
				[ key ],
				[ - this.stamper.genegate() ]
			) )
			
			return this
		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {

			const patch_array = [] as $mol_crowd_delta_value[]
			const patch_stamps = new Map< $mol_crowd_delta_value, number >()
			
			for( let i = 0; i < delta.values.length; ++i ) {
				const key = delta.values[i]
				const stamp = delta.stamps[i]
				patch_stamps.set( key, stamp )
				if( stamp > 0 ) patch_array.push( key )
			}
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const current_key = delta.values[i]
				const current_patch_stamp = delta.stamps[i]
				
				const current_self_stamp = this.stamps.get( current_key ) ?? 0
				const current_patch_version = this.stamper.version_from( current_patch_stamp )
				
				if( this.version_item( current_key ) >= current_patch_version ) continue
				
				this.stamps.set( current_key, current_patch_stamp )
				this.version_feed( current_patch_version )
				
				if( current_patch_stamp <= 0 ) {
					
					if( current_self_stamp > 0 ) {
						this.array.splice( this.array.indexOf( current_key ), 1 )
					}
					
					continue
				}
				
				for( let anchor = patch_array.indexOf( current_key ) - 1 ;; anchor -- ) {
					
					const anchor_key = patch_array[ anchor ]
					
					if( anchor >= 0 ) {
						const anchor_self_version = this.version_item( anchor_key )
						if( anchor_self_version === 0 ) continue
						if( anchor_self_version > this.stamper.version_from( patch_stamps.get( anchor_key )! ) ) continue
					}
					
					let next_pos = anchor_key !== undefined ? this.array.indexOf( anchor_key ) + 1 : 0
					
					while( next_pos < this.array.length ) {
						if( this.version_item( this.array[ next_pos ] ) <= current_patch_version ) break
						next_pos ++
					}
					
					if( current_self_stamp <= 0 ) {
						this.array.splice( next_pos, 0, current_key )
						break
					}
					
					const current_pos = this.array.indexOf( current_key )
					
					if( current_pos === next_pos ) break
					
					if( current_pos > next_pos ) {
						
						this.array.splice(
							next_pos,
							current_pos - next_pos + 1,
							current_key, ... this.array.slice( next_pos, current_pos )
						)
						
					} else {
						
						this.array.splice(
							current_pos,
							next_pos - current_pos + 1,
							... this.array.slice( current_pos + 1, next_pos + 1 ), current_key
						)
						
					}
					
					break
				}
				
			}
			
			return this
		}
		
	}
	
}
