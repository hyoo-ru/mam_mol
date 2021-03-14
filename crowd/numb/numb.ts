namespace $ {
	
	/** JSON representation of CROWD Counter */
	export type $mol_crowd_numb_data = readonly(
		readonly[ number, number ]
	)[]
	
	/** CROWD Counter */
	export class $mol_crowd_numb {
		
		stores = new Map< number, $mol_crowd_reg >()
		
		constructor(
			data = [] as $mol_crowd_numb_data,
			protected stamper = new $mol_crowd_stamper,
		) {
			this.merge( data )
		}

		get value() {
			
			let res = 0
			
			for( const store of this.stores.values() ) {
				res += Number( store.value )
			}
			
			return res
		}
		
		toJSON( version_min = 0 ) {
			
			const res = [] as ( readonly[ number, number ] )[]
			
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
			
			store = new $mol_crowd_reg( [], this.stamper )
			this.stores.set( path, store )
			
			return store
		}
		
		shift( diff = 1 ) {
			
			const store = this.reg( this.stamper.actor )
			const prev = Number( store.value ?? 0 )
			
			store.put( prev + diff )
			
			return this
		}
		
		merge(
			data: $mol_crowd_numb_data,
		) {
			
			for( const patch of data ) {
				const actor = this.stamper.actor_from( patch[1] )
				this.reg( actor ).merge([ patch ])
			}
			
			return this
		}
		
		fork( actor: number ) {
			
			return new $mol_crowd_numb(
				this.toJSON(),
				this.stamper.fork( actor ),
			) as this
			
		}
		
	}
	
}
