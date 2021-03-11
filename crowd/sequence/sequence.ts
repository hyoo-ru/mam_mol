namespace $ {
	
	/** JSON representation of Ordered Set */
	export type $mol_crowd_sequence_data< Key extends string | number > = readonly $mol_crowd_register_data< Key >[]
	
	/** Conflict Free Mergeable Ordered Set */
	export class $mol_crowd_sequence< Key extends string | number > extends $mol_crowd_base {
		
		protected readonly array: Key[]
		protected readonly stamps: Map< Key, number >
		protected version_next: number
		
		constructor(
			actor?: number,
			stamps = [] as $mol_crowd_sequence_data< Key >,
		) {
			
			super( actor )
			
			this.stamps = new Map( stamps )

			let max = 0
			
			this.array = []
			
			for( let [ key, stamp ] of stamps ) {
				
				if( stamp > 0 ) this.array.push( key )
				
				if( stamp > max ) {
					max = Math.max( Math.abs( stamp ), max )
				}
				
			}
			
			this.version_next = this.version_increase( max )
			
		}
		
		get items() {
			return this.array as readonly string[]
		}
		
		has( val: Key ) {
			return this.stamps.get( val )! > 0
		}
		
		version( val: Key ) {
			return Math.abs( this.stamps.get( val ) ?? 0 )
		}
		
		toJSON() {
			
			const res = [] as [ Key, number ][]
			
			for( const key of this.array ) {
				res.push([ key, this.stamps.get( key )! ])
			}
			
			for( const [ key, stamp ] of this.stamps ) {
				if( stamp > 0 ) continue
				res.push([ key, stamp ])
			}
			
			return res as $mol_crowd_sequence_data< Key >
		}
		
		put(
			key: Key,
			pos: number = this.array.length,
		) {
			
			const exists = this.array[ pos ]
			if( exists === key ) return this
			
			const patch = [] as [ Key, number ][]
				
			patch.push([ key, this.version_next ])
			if( exists ) patch.push([ exists, this.stamps.get( exists )! ])
				
			this.merge( new $mol_crowd_sequence( this.actor, patch ) )
			
			return this
		}
		
		kick(
			key: Key
		) {
			
			const stamp = this.stamps.get( key ) ?? 0
			if( stamp <= 0 ) return this
			
			const patch = [] as [ Key, number ][]
			
			patch.push([ key, - this.version_next ])
			
			this.merge( new $mol_crowd_sequence( this.actor, patch ) )
			
			return this
		}
		
		merge(
			patch: $mol_crowd_sequence< Key >,
		) {
			
			for( let current_key of [ ... patch.stamps.keys() ].reverse() ) {
				
				const current_self_stamp = this.stamps.get( current_key ) ?? 0
				const current_patch_stamp = patch.stamps.get( current_key )!
				const current_patch_version = patch.version( current_key )
				
				if( this.version( current_key ) >= patch.version( current_key ) ) continue
				
				this.stamps.set( current_key, current_patch_stamp )
				if( current_patch_version >= this.version_next ) {
					this.version_next = this.version_increase( current_patch_version )
				}
				
				if( current_patch_stamp <= 0 ) {
					
					if( current_self_stamp > 0 ) {
						this.array.splice( this.array.indexOf( current_key ), 1 )
					}
					
					continue
				}
				
				for( let anchor = patch.array.indexOf( current_key ) + 1 ;; anchor ++ ) {
					
					const anchor_key = patch.array[ anchor ]
					
					if( anchor < patch.array.length ) {
						const anchor_self_version = this.version( anchor_key )
						if( anchor_self_version === 0 ) continue
						if( anchor_self_version > patch.version( anchor_key ) ) continue
					}
					
					let next_pos = anchor_key ? this.array.indexOf( anchor_key ) : this.array.length
					
					while( next_pos > 0 ) {
						if( this.version( this.array[ next_pos - 1 ] ) <= current_patch_version ) break
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
			return new $mol_crowd_sequence( actor, this.toJSON() )
		}
		
	}
	
}
