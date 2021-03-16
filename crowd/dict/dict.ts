namespace $ {
	
	/** CROWD Dictionary */
	export class $mol_crowd_dict<
		Value extends $mol_crowd_store,
	> extends $mol_crowd_store {
		
		stores = new Map< $mol_crowd_delta_value, Value >()
		
		constructor(
			public Value: new( stamper: $mol_crowd_stamper )=> Value,
			stamper = new $mol_crowd_stamper,
		) {
			super( stamper )
		}
		
		fork( actor: number ): this {
			
			const Fork = this.constructor as new(
				Value: new( stamper: $mol_crowd_stamper )=> Value,
				stamper: $mol_crowd_stamper
			)=> this
			
			const fork = new Fork( this.Value, this.stamper.fork( actor ) ) as this
			fork.apply( this.toJSON() )
			
			return fork
		}
		
		toJSON( version_min = 0 ) {
			
			const delta = $mol_crowd_delta([],[])
			
			for( const [ key, value ] of this.stores ) {
				
				const patch = value.toJSON( version_min )
				if( patch.values.length === 0 ) continue
				
				delta.values.push( key, ... patch.values )
				delta.stamps.push( 0, ... patch.stamps )
				
			}
			
			return delta
		}
		
		has( key: $mol_crowd_delta_value ) {
			return this.stores.has( key )
		}
		
		get( key: $mol_crowd_delta_value ) {
			
			let store = this.stores.get( key )
			if( store ) return store
			
			store = new this.Value( this.stamper )
			this.stores.set( key, store )
			
			return store
		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >
		) {
			
			let key: $mol_crowd_delta_value
			
			let patch = $mol_crowd_delta([],[])
			
			const dump = ()=> {
				if( patch.values.length === 0 ) return
				this.get( key ).apply( patch )
				patch = $mol_crowd_delta([],[])
			}
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const val = delta.values[i]
				const stamp = delta.stamps[i]
				
				if( stamp === 0 ) {
					dump()
					key = val
					continue
				} else {
					patch.values.push( val )
					patch.stamps.push( stamp )
				}
				
			}
			
			dump()
			
			return this
		}
		
	}
	
}
