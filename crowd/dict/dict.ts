namespace $ {
	
	/** Types that can be stored in the CROWD Dictionary */
	export type $mol_crowd_dict_store =
	| $mol_crowd_numb
	| $mol_crowd_reg
	| $mol_crowd_list
	| $mol_crowd_set
	| $mol_crowd_dict
	
	/** JSON representation of CROWD Dictionary */
	export type $mol_crowd_dict_data = readonly(
		readonly[ string,
			| $mol_crowd_numb_data
			| $mol_crowd_reg_data
			| $mol_crowd_list_data
			| $mol_crowd_set_data
			| $mol_crowd_dict_data
		]
	)[]
	
	/** CROWD Dictionary */
	export class $mol_crowd_dict extends $mol_crowd_store< $mol_crowd_dict_data > {
		
		stores = new Map< string, $mol_crowd_dict_store >()
		
		toJSON( version_min = 0 ) {
			
			const res = [] as $mol_crowd_dict_data[number][]
			
			for( const [ key, value ] of this.stores ) {
				
				const patch = value.toJSON( version_min )
				if( patch.length === 0 ) continue
				
				res.push([ key, patch ])
			}
			
			return res as $mol_crowd_dict_data
		}
		
		store<
			Store extends $mol_crowd_dict_store
		>(
			path: string,
			Store: new( stamper: $mol_crowd_stamper )=> Store,
		) {
			
			let store = this.stores.get( path ) as any as Store
			if( store ) return store
			
			store = new Store( this.stamper )
			this.stores.set( path, store )
			
			return store
		}
		
		numb( path: string ) {
			return this.store( '#' + path, $mol_crowd_reg )
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
		
		dict( path: string ) {
			return this.store( '&' + path, $mol_crowd_dict )
		}
		
		merge(
			data: $mol_crowd_dict_data,
		) {
			
			for( const [ path, patch ] of data ) {
				
				let store = this.stores.get( path )
				
				if( !store ) {
					
					const Stores = {
						'#': $mol_crowd_numb,
						':': $mol_crowd_reg,
						'?': $mol_crowd_set,
						'!': $mol_crowd_list,
						'&': $mol_crowd_dict,
					}
					
					const Store = Stores[ path[0] ]
					if( !Store ) $mol_fail( new Error( `Wrong path prefix: ${ path }` ) )

					store = this.store( path, Store )
				}
				
				store.merge( patch as any )
				
			}
			
			return this
		}
		
	}
	
}
