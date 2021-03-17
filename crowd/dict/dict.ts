namespace $ {
	
	/** CROWD Dictionary */
	export class $mol_crowd_dict<
		Value extends typeof $mol_crowd_store,
	> extends $mol_crowd_store {
		
		static of<
			Value extends typeof $mol_crowd_store
		>(
			Value: Value,
		) {
			return class Dictionary extends this<Value> {
				Value = Value
			}
		}
		
		Value!: Value
		
		stores = new Map< $mol_crowd_delta_value, InstanceType< Value > >()
		
		toJSON( version_min = 0 ) {
			
			const delta = $mol_crowd_delta([],[])
			
			for( const [ key, value ] of this.stores ) {
				
				const patch = value.toJSON( version_min )
				if( patch.values.length === 0 ) continue
				
				delta.values.push( key, ... patch.values )
				delta.stamps.push( - patch.values.length, ... patch.stamps )
				
			}
			
			return delta
		}
		
		has( key: $mol_crowd_delta_value ) {
			return this.stores.has( key )
		}
		
		for( key: $mol_crowd_delta_value ) {
			
			let store = this.stores.get( key )
			if( store ) return store
			
			store = new this.Value( this.stamper ) as InstanceType<Value>
			this.stores.set( key, store )
			
			return store
		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >
		) {
			
			let key: $mol_crowd_delta_value
			let count = 0
			let patch = $mol_crowd_delta([],[])
			
			const dump = ()=> {
				if( patch.values.length === 0 ) return
				this.for( key ).apply( patch )
				patch = $mol_crowd_delta([],[])
			}
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const val = delta.values[i]
				const stamp = delta.stamps[i]
				
				if( count === 0 ) {
					
					dump()
					key = val
					count = - stamp
					continue
					
				} else {
					
					patch.values.push( val )
					patch.stamps.push( stamp )
					-- count
					
				}
				
			}
			
			dump()
			
			return this
		}
		
	}
	
}
