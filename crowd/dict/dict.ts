namespace $ {
	
	/** Types that can be stored in the Crowd Dictionary */
	export type $mol_crowd_dict_store = $mol_crowd_reg | $mol_crowd_seq | $mol_crowd_set
	
	/** JSON representation of Crowd Dictionary */
	export type $mol_crowd_dict_data = readonly( readonly[ string, ReturnType< $mol_crowd_dict_store["toJSON"] > ] )[]
	
	/** Conflict-free Crowd Dictionary */
	export class $mol_crowd_dict extends $mol_crowd_base {
		
		stores = new Map< string, $mol_crowd_dict_store >()
		
		constructor(
			actor?: number,
			stores = [] as readonly( readonly[ string, $mol_crowd_dict_store ] )[],
		) {
			super( actor )
			this.stores = new Map( stores )
		}

		toJSON() {
			
			const res = [] as ( readonly[ string, $mol_crowd_reg_data | $mol_crowd_seq_data ] )[]
			
			for( const [ key, value ] of this.stores ) {
				res.push([ key, value.toJSON() ] as const )
			}
			
			return res as $mol_crowd_dict_data
		}
		
		store<
			Store extends $mol_crowd_dict_store
		>( id: string, Store: new( actor: number )=> Store ) {
			
			let store = this.stores.get( id ) as any as Store
			if( store ) return store
			
			store = new Store( this.actor )
			this.stores.set( id, store )
			
			return store
		}
		
		mutate<
			Store extends $mol_crowd_dict_store
		>( store: Store, action: ( store: Store )=> void ) {
			
			store.version_max = this.version_max
			
			action( store )
			
			this.version_max = store.version_max
		}
		
		put( id: `:${ string }`, val: $mol_crowd_reg_value ) {
			
			this.mutate(
				this.store( id, $mol_crowd_reg ),
				store => store.set( val ),
			)
			
			return this
		}
		
		insert( id: `!${ string }`, key: $mol_crowd_seq_key, pos?: number ) {
			
			this.mutate(
				this.store( id, $mol_crowd_seq ),
				store => store.insert( key, pos ),
			)
			
			return this
		}
		
		cut( id: `!${ string }`, key: $mol_crowd_seq_key ) {
			
			this.mutate(
				this.store( id, $mol_crowd_seq ),
				store => store.cut( key ),
			)
			
			return this
		}
		
		add( id: `?${ string }`, key: $mol_crowd_set_key ) {
			
			this.mutate(
				this.store( id, $mol_crowd_set ),
				store => store.add( key ),
			)
			
			return this
		}
		
		remove( id: `?${ string }`, key: $mol_crowd_set_key ) {
			
			this.mutate(
				this.store( id, $mol_crowd_set ),
				store => store.remove( key ),
			)
			
			return this
		}
		
		merge(
			patch: $mol_crowd_dict,
		) {
			
			for( const [ id, store ] of patch.stores ) {
				
				const self = this.stores.get( id )
				
				if( !self ) {
					this.stores.set( id, store )
					this.version_feed( store.version_max )
				} else if( self !== store ) {
					this.mutate( self, self => self.merge( store.toJSON() as any ) )
				}
				
			}
			
			return this
		}
		
		// fork( actor = this.actor ) {
		// 	return new $mol_crowd_document( actor, [ ... this.stores.entries() ] )
		// }
		
	}
	
}
