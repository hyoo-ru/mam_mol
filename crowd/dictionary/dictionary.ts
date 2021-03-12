namespace $ {
	
	export type $mol_crowd_dictionary_store = $mol_crowd_register | $mol_crowd_sequence
	
	/** JSON representation of Dictionary */
	export type $mol_crowd_dictionary_data = readonly( readonly[ string, ReturnType< $mol_crowd_dictionary_store["toJSON"] > ] )[]
	
	/** Conflict Free Mergeable Dictionary */
	export class $mol_crowd_dictionary extends $mol_crowd_base {
		
		stores = new Map< string, $mol_crowd_register | $mol_crowd_sequence >()
		
		constructor(
			actor?: number,
			stores = [] as readonly( readonly[ string, $mol_crowd_dictionary_store ] )[],
		) {
			super( actor )
			this.stores = new Map( stores )
		}

		toJSON() {
			
			const res = [] as ( readonly[ string, $mol_crowd_register_data | $mol_crowd_sequence_data ] )[]
			
			for( const [ key, value ] of this.stores ) {
				res.push([ key, value.toJSON() ] as const )
			}
			
			return res as $mol_crowd_dictionary_data
		}
		
		denormalized() {
			
		}
		
		store<
			Store extends $mol_crowd_dictionary_store
		>( id: string, Store: new( actor: number )=> Store ) {
			
			let store = this.stores.get( id ) as any as Store
			if( store ) return store
			
			store = new Store( this.actor )
			this.stores.set( id, store )
			
			return store
		}
		
		put( id: `:${ string }`, val: $mol_crowd_register_value ) {
			
			this.store( id, $mol_crowd_register ).set( val )
			
			return this
		}
		
		bring( id: `=${ string }`, key: $mol_crowd_sequence_key, pos?: number ) {
			
			this.store( id, $mol_crowd_sequence ).bring( key, pos )
			
			return this
		}
		
		kick( id: `=${ string }`, key: $mol_crowd_sequence_key ) {
			
			this.store( id, $mol_crowd_sequence ).kick( key )
			
			return this
		}
		
		merge(
			patch: $mol_crowd_dictionary,
		) {
			
			for( const [ id, store ] of patch.stores ) {
				
				const self = this.stores.get( id )
				
				if( !self ) this.stores.set( id, store )
				else if( self === store ) continue
				else self.merge( store.toJSON() as any )
				
			}
			
			return this
		}
		
		// fork( actor = this.actor ) {
		// 	return new $mol_crowd_document( actor, [ ... this.stores.entries() ] )
		// }
		
	}
	
}
