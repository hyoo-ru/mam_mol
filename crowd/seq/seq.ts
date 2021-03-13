namespace $ {
	
	/** Types that can be stored in the Crowd Ordered Set */
	export type $mol_crowd_seq_key = string | number
	
	/** JSON representation of Crowd Ordered Set */
	export type $mol_crowd_seq_data = readonly( readonly[ $mol_crowd_seq_key, number ] )[]
	
	/** Conflict-free Crowd Ordered Set */
	export class $mol_crowd_seq extends $mol_crowd_base {
		
		protected readonly array: $mol_crowd_seq_key[]
		protected readonly stamps: Map< $mol_crowd_seq_key, number >
		
		constructor(
			actor?: number,
			stamps = [] as $mol_crowd_seq_data,
		) {
			
			super( actor )
			
			this.stamps = new Map( stamps )
			this.array = []
			
			for( let [ key, stamp ] of stamps ) {
				if( stamp > 0 ) this.array.push( key )
				this.version_feed( Math.abs( stamp ) )
			}
			
		}
		
		get items() {
			return this.array as readonly string[]
		}
		
		has( val: $mol_crowd_seq_key ) {
			return this.stamps.get( val )! > 0
		}
		
		version_item( val: $mol_crowd_seq_key ) {
			return Math.abs( this.stamps.get( val ) ?? 0 )
		}
		
		toJSON() {
			
			const res = [] as [ $mol_crowd_seq_key, number ][]
			
			for( const key of this.array ) {
				res.push([ key, this.stamps.get( key )! ])
			}
			
			for( const [ key, stamp ] of this.stamps ) {
				if( stamp > 0 ) continue
				res.push([ key, stamp ])
			}
			
			return res as $mol_crowd_seq_data
		}
		
		insert(
			key: $mol_crowd_seq_key,
			pos: number = this.array.length,
		) {
			
			const exists = this.array[ pos ]
			if( exists === key ) return this
			
			const patch = [] as [ $mol_crowd_seq_key, number ][]
				
			patch.push([ key, this.version_gen() ])
			if( exists ) patch.push([ exists, this.stamps.get( exists )! ])
				
			this.merge( patch )
			
			return this
		}
		
		cut(
			key: $mol_crowd_seq_key
		) {
			
			const stamp = this.stamps.get( key ) ?? 0
			if( stamp <= 0 ) return this
			
			const patch = [] as [ $mol_crowd_seq_key, number ][]
			
			patch.push([ key, - this.version_gen() ])
			
			this.merge( patch )
			
			return this
		}
		
		merge(
			data: $mol_crowd_seq_data,
		) {
			
			const patch = new $mol_crowd_seq( this.actor, data )
			
			for( let current_key of [ ... patch.stamps.keys() ].reverse() ) {
				
				const current_self_stamp = this.stamps.get( current_key ) ?? 0
				const current_patch_stamp = patch.stamps.get( current_key )!
				const current_patch_version = patch.version_item( current_key )
				
				if( this.version_item( current_key ) >= patch.version_item( current_key ) ) continue
				
				this.stamps.set( current_key, current_patch_stamp )
				this.version_feed( Math.max( current_patch_version ) )
				
				if( current_patch_stamp <= 0 ) {
					
					if( current_self_stamp > 0 ) {
						this.array.splice( this.array.indexOf( current_key ), 1 )
					}
					
					continue
				}
				
				for( let anchor = patch.array.indexOf( current_key ) + 1 ;; anchor ++ ) {
					
					const anchor_key = patch.array[ anchor ]
					
					if( anchor < patch.array.length ) {
						const anchor_self_version = this.version_item( anchor_key )
						if( anchor_self_version === 0 ) continue
						if( anchor_self_version > patch.version_item( anchor_key ) ) continue
					}
					
					let next_pos = anchor_key ? this.array.indexOf( anchor_key ) : this.array.length
					
					while( next_pos > 0 ) {
						if( this.version_item( this.array[ next_pos - 1 ] ) <= current_patch_version ) break
						next_pos --
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
		
		fork( actor = this.actor ) {
			const fork = new $mol_crowd_seq( actor, this.toJSON() )
			fork.version_max = this.version_max
			return fork
		}
		
	}
	
}
