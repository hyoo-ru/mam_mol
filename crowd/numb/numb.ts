namespace $ {
	
	/** JSON representation of CROWD Counter */
	export type $mol_crowd_numb_data = readonly(
		readonly[ number, number ]
	)[]
	
	/** CROWD Counter */
	export class $mol_crowd_numb extends $mol_crowd_store< $mol_crowd_numb_data > {
		
		stores = new Map< number, $mol_crowd_reg >()
		
		get value() {
			
			let res = 0
			
			for( const store of this.stores.values() ) {
				res += Number( store.value )
			}
			
			return res
		}
		
		toJSON( version_min = 0 ) {
			
			const res = [] as $mol_crowd_numb_data[number][]
			
			const sorted = [ ... this.stores.entries() ]
			.sort( ( a, b )=> a[0] - b[0] )
			
			for( const [, store ] of sorted ) {
				
				const patch = store.toJSON( version_min )
				if( patch.length === 0 ) continue
				
				res.push( ... patch as any )
			}
			
			return res as $mol_crowd_numb_data
		}
		
		reg( path: number ) {
			
			let store = this.stores.get( path )
			if( store ) return store
			
			store = new $mol_crowd_reg( this.stamper )
			this.stores.set( path, store )
			
			return store
		}
		
		shift( diff = 1 ) {
			
			const store = this.reg( this.stamper.actor )
			const prev = Number( store.value ?? 0 )
			
			store.put( prev + diff )
			
			return this
		}
		
		apply(
			data: $mol_crowd_numb_data,
		) {
			
			for( const patch of data ) {
				const actor = this.stamper.actor_from( patch[1] )
				this.reg( actor ).apply([ patch ])
			}
			
			return this
		}
		
	}
	
}
