namespace $ {
	
	/** Types that can be stored in the CROWD Ordered Set */
	export type $mol_crowd_list_key = string | number
	
	/** JSON representation of CROWD Ordered Set */
	export type $mol_crowd_list_data = readonly( readonly[ $mol_crowd_list_key, number ] )[]
	
	/** CROWD Ordered Set */
	export class $mol_crowd_list extends $mol_crowd_store< $mol_crowd_list_data > {
		
		protected version = 0
		protected readonly array = [] as $mol_crowd_list_key[]
		protected readonly stamps = new Map< $mol_crowd_list_key, number >()
		
		get items() {
			return this.array.slice() as readonly $mol_crowd_list_key[]
		}
		
		has( val: $mol_crowd_list_key ) {
			return this.stamps.get( val )! > 0
		}
		
		version_item( val: $mol_crowd_list_key ) {
			return Math.abs( this.stamps.get( val ) ?? 0 )
		}
		
		version_feed( version: number ) {
			
			this.stamper.feed( version )
			
			if( version <= this.version ) return
			this.version = version
			
		}
		
		toJSON( version_min = 0 ): $mol_crowd_list_data {
			
			if( this.version <= version_min ) return []
			
			const res = [] as [ $mol_crowd_list_key, number ][]
			
			for( const key of this.array ) {
				res.push([ key, this.stamps.get( key )! ])
			}
			
			for( const [ key, stamp ] of this.stamps ) {
				if( stamp > 0 ) continue
				res.push([ key, stamp ])
			}
			
			return res
		}
		
		insert(
			key: $mol_crowd_list_key,
			pos: number = this.array.length,
		) {
			
			const exists = this.array[ pos ]
			if( exists === key ) return this
			
			const patch = [] as [ $mol_crowd_list_key, number ][]
				
			if( pos > 0 ) {
				const anchor = this.array[ pos - 1 ]
				patch.push([ anchor, this.stamps.get( anchor )! ])
			}
			
			patch.push([ key, this.stamper.genegate() ])
				
			this.merge( patch )
			
			return this
		}
		
		cut(
			key: $mol_crowd_list_key
		) {
			
			const stamp = this.stamps.get( key ) ?? 0
			if( stamp <= 0 ) return this
			
			const patch = [] as [ $mol_crowd_list_key, number ][]
			
			patch.push([ key, - this.stamper.genegate() ])
			
			this.merge( patch )
			
			return this
		}
		
		merge(
			data: $mol_crowd_list_data,
		) {

			const patch_array = [] as $mol_crowd_list_key[]
			const patch_stamps = new Map< $mol_crowd_list_key, number >()
			
			for( let [ key, stamp ] of data ) {
				if( stamp > 0 ) patch_array.push( key )
			}
			
			for( let [ current_key, current_patch_stamp ] of data ) {
				
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
					
					if( anchor > 0 ) {
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
