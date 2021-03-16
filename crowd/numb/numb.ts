namespace $ {
	
	/** CROWD Counter */
	export class $mol_crowd_numb extends $mol_crowd_store {
		
		stores = new Map< number, $mol_crowd_reg >()
		
		get value() {
			
			let res = 0
			
			for( const store of this.stores.values() ) {
				res += Number( store.value ) || 0
			}
			
			return res
		}
		
		toJSON( version_min = 0 ) {
			
			const delta = $mol_crowd_delta([],[])
			
			for( const store of this.stores.values() ) {
				
				const patch = store.toJSON( version_min )
				if( patch.values.length === 0 ) continue
				
				delta.values.push( ... patch.values )
				delta.stamps.push( ... patch.stamps )
			}
			
			return delta
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
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {
			
			for( let i = 0 ; i < delta.values.length; ++ i ) {
				
				const actor = this.stamper.actor_from( delta.stamps[i] )
				
				this.reg( actor ).apply(
					$mol_crowd_delta(
						[ delta.values[i] ],
						[ delta.stamps[i] ],
					)
				)
				
			}
			
			return this
		}
		
	}
	
}
