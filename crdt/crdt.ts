namespace $ {
	
	/** JSON representation of Ordered Set */
	export type $mol_crdt_data = Readonly< Record< string, number > >
	
	/** Conflict Free Mergeable Ordered Set */
	export class $mol_crdt_list {
		
		static readonly concurrency = 100_000;
		
		protected readonly actor: number
		protected readonly array: string[]
		protected readonly stamps: Record< string, number | undefined >
		protected version_last: number
		
		constructor(
			actor?: number,
			stamps = Object.create( null ) as Record< string, number | undefined >,
		) {
			
			actor = this.actor = actor
				? actor % $mol_crdt_list.concurrency
				: Math.floor( $mol_crdt_list.concurrency * Math.random() )
			
			this.stamps = stamps

			let max = 0
			
			this.array = Object.keys( stamps ).filter( id => {
				
				let version = stamps[ id ] ?? 0
				if( version < 0 ) version = - version
				
				if( version > max ) max = version
				
				return version > 0
				
			} )
			
			this.version_last = Math.floor( max / $mol_crdt_list.concurrency ) * $mol_crdt_list.concurrency + actor
			
		}
		
		get items() {
			return this.array as readonly string[]
		}
		
		has( val: string ) {
			return this.stamps[ val ]! > 0
		}
		
		version( val: string ) {
			return Math.abs( this.stamps[ val ] ?? 0 )
		}
		
		toJSON() {
			
			const res = {} as Record< string, number >
			
			for( const id of this.array ) {
				res[ id ] = this.stamps[ id ]!
			}
			
			for( const id in this.stamps ) {
				
				const stamp = this.stamps[ id ]!
				if( stamp > 0 ) continue
				
				res[ id ] = stamp
			}
			
			return res as $mol_crdt_data
		}
		
		put(
			id: string,
			pos: number = this.array.length,
		) {
			
			const patch = Object.create( null ) as Record< string, number >

			const exists = this.array[ pos ]
			if( exists === id ) return this
				
			patch[ id ] = this.version_last + $mol_crdt_list.concurrency
			if( exists ) patch[ exists ] = this.stamps[ exists ]!
				
			return this.merge( new $mol_crdt_list( this.actor, patch ) )
		}
		
		kick(
			id: string
		) {
			
			const patch = Object.create( null ) as Record< string, number >

			const stamp = this.stamps[ id ] ?? 0
			if( stamp <= 0 ) return this
			
			patch[ id ] = - this.version_last - $mol_crdt_list.concurrency
			
			return this.merge( new $mol_crdt_list( this.actor, patch ) )
		}
		
		merge(
			patch: $mol_crdt_list,
		) {
			
			for( let current_id of Object.keys( patch.stamps ).reverse() ) {
				
				const current_self_stamp = this.stamps[ current_id ] ?? 0
				const current_patch_stamp = patch.stamps[ current_id ]!
				const current_patch_version = patch.version( current_id )
				
				if( this.version( current_id ) >= patch.version( current_id ) ) continue
				
				this.stamps[ current_id ] = current_patch_stamp
				if( current_patch_version > this.version_last ) {
					this.version_last = Math.floor( current_patch_version / $mol_crdt_list.concurrency ) * $mol_crdt_list.concurrency + this.actor
				}
				
				if( current_patch_stamp <= 0 ) {
					
					if( current_self_stamp > 0 ) {
						this.array.splice( this.array.indexOf( current_id ), 1 )
					}
					
					continue
				}
				
				for( let anchor = patch.array.indexOf( current_id ) + 1 ;; anchor ++ ) {
					
					const anchor_id = patch.array[ anchor ]
					
					if( anchor < patch.array.length ) {
						const anchor_self_version = this.version( anchor_id )
						if( anchor_self_version === 0 ) continue
						if( anchor_self_version > patch.version( anchor_id ) ) continue
					}
					
					let next_pos = anchor_id ? this.array.indexOf( anchor_id ) : this.array.length
					
					while( next_pos > 0 ) {
						if( this.version( this.array[ next_pos - 1 ] ) <= current_patch_version ) break
						next_pos --
					}
					
					if( current_self_stamp <= 0 ) {
						this.array.splice( next_pos, 0, current_id )
						break
					}
					
					const current_pos = this.array.indexOf( current_id )
					
					if( current_pos === next_pos ) break
					
					if( current_pos > next_pos ) {
						
						this.array.splice(
							next_pos,
							current_pos - next_pos + 1,
							current_id, ... this.array.slice( next_pos, current_pos )
						)
						
					} else {
						
						this.array.splice(
							current_pos,
							next_pos - current_pos + 1,
							... this.array.slice( current_pos + 1, next_pos + 1 ), current_id
						)
						
					}
					
					break
				}
				
			}
			
			return this
		}
		
		fork( actor = this.actor ) {
			return new $mol_crdt_list( actor, this.toJSON() )
		}
		
	}
	
}
