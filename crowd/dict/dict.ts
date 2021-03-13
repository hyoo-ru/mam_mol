namespace $ {
	
	/** Types that can be stored in the Crowd Dictionary */
	export type $mol_crowd_dict_store = $mol_crowd_reg | $mol_crowd_list | $mol_crowd_set
	
	/** JSON representation of Crowd Dictionary */
	export type $mol_crowd_dict_data = readonly( readonly[ string, ReturnType< $mol_crowd_dict_store["toJSON"] > ] )[]
	
	/** Conflict-free Crowd Dictionary */
	export class $mol_crowd_dict {
		
		stores = new Map< string, $mol_crowd_dict_store >()
		
		constructor(
			data = [] as $mol_crowd_dict_data,
			protected stamper = new $mol_crowd_stamper,
		) {
			this.merge( data )
		}

		toJSON( version_min = 0 ) {
			
			const res = [] as ( readonly[ string, $mol_crowd_reg_data | $mol_crowd_list_data ] )[]
			
			for( const [ key, value ] of this.stores ) {
				
				const patch = value.toJSON( version_min )
				if( patch.length === 0 ) continue
				
				res.push([ key, patch ] as const )
			}
			
			return res as $mol_crowd_dict_data
		}
		
		store<
			Store extends $mol_crowd_dict_store
		>(
			path: string,
			Store: new( data: [], stamper: $mol_crowd_stamper )=> Store,
		) {
			
			let store = this.stores.get( path ) as any as Store
			if( store ) return store
			
			store = new Store( [], this.stamper )
			this.stores.set( path, store )
			
			return store
		}
		
		reg( path: string ) {
			return this.store( ':' + path, $mol_crowd_reg )
		}
		
		set( path: string ) {
			return this.store( '?' + path, $mol_crowd_set )
		}
		
		list( path: string ) {
			return this.store( '!' + path, $mol_crowd_list )
		}
		
		merge(
			data: $mol_crowd_dict_data,
		) {
			
			for( const [ path, patch ] of data ) {
				
				let store = this.stores.get( path )
				
				if( !store ) {
					
					const Stores = {
						':': $mol_crowd_reg,
						'?': $mol_crowd_set,
						'!': $mol_crowd_list,
					}
					
					const Store = Stores[ path[0] ]
					if( !Store ) $mol_fail( new Error( `Wrong path prefix: ${ path }` ) )

					store = this.store( path, Store )
					this.stores.set( path, store )
				}
				
				store.merge( patch as any )
				
			}
			
			return this
		}
		
		fork( actor: number ) {
			return new $mol_crowd_dict(
				this.toJSON(),
				this.stamper.fork( actor ),
			)
		}
		
	}
	
}
