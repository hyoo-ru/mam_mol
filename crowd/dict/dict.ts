namespace $ {
	
	/** JSON representation of CROWD Dictionary */
	export type $mol_crowd_dict_data< Value > = readonly(
		readonly[ string, Value ]
	)[]
	
	/** CROWD Dictionary */
	export class $mol_crowd_dict<
		Value extends $mol_crowd_store< Value_data >,
		Value_data extends readonly unknown[],
	> extends $mol_crowd_store< $mol_crowd_dict_data< Value_data > > {
		
		stores = new Map< string, Value >()
		
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
			
			const res = [] as $mol_crowd_dict_data< Value_data >[number][]
			
			for( const [ key, value ] of this.stores ) {
				
				const patch = value.toJSON( version_min )
				if( patch.length === 0 ) continue
				
				res.push([ key, patch ])
			}
			
			return res as $mol_crowd_dict_data< Value_data >
		}
		
		has( key: string ) {
			return this.stores.has( key )
		}
		
		get( key: string ) {
			
			let store = this.stores.get( key )
			if( store ) return store
			
			store = new this.Value( this.stamper )
			this.stores.set( key, store )
			
			return store
		}
		
		apply( data: $mol_crowd_dict_data< Value_data > ) {
			
			for( const [ key, patch ] of data ) {
				this.get( key ).apply( patch )
			}
			
			return this
		}
		
	}
	
}
