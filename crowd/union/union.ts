namespace $ {
	
	/** CROWD Register */
	export class $mol_crowd_union<
		Types extends Record< string,
			new( stamper: $mol_crowd_stamper )=> Value
		>,
		Value extends $mol_crowd_store,
	> extends $mol_crowd_store {
		
		protected type_store = new $mol_crowd_reg( this.stamper )
		protected value_store?: Value
		
		constructor(
			public Types: Types,
			stamper = new $mol_crowd_stamper,
		) {
			super( stamper )
		}
		
		fork( actor: number ): this {
			
			const Fork = this.constructor as new(
				Values: Types,
				stamper: $mol_crowd_stamper
			)=> this
			
			const fork = new Fork( this.Types, this.stamper.fork( actor ) ) as this
			fork.apply( this.toJSON() )
			
			return fork
		}
		
		get type() {
			const type = this.type_store.value
			return type as Extract< keyof Types, string > | null
		}
		
		as< Type extends Extract< keyof Types, string > >( type: Type ): InstanceType< Types[ Type ] > | null {
			
			if( this.type !== type ) return null
			if( this.value_store ) return this.value_store as InstanceType< Types[ Type ] >
			
			return this.to( type )
		}
		
		to< Type extends Extract< keyof Types, string > >( type: Type, stamp?: number ): InstanceType< Types[ Type ] > {
			
			if( this.type === type ) return this.as( type )!
			
			this.type_store.apply(
				$mol_crowd_delta(
					[ type ],
					[ stamp || this.stamper.genegate() ],
				)
			)
			
			if( this.type !== type ) return this.as( this.type! )! as any
			
			const store = new this.Types[ type ]( this.stamper )
			if( this.value_store ) store.apply( this.value_store.toJSON() )
			
			return this.value_store = store as any
		}
		
		toJSON( version_min = 0 ) {
			
			const val = this.value_store?.toJSON( version_min )
			if( val?.values.length === 0 ) return $mol_crowd_delta([],[])
			
			const type = this.type_store.toJSON()
			
			return $mol_crowd_delta(
				[
					... type.values,
					... val?.values ?? [],
				],
				[
					... type.stamps,
					... val?.stamps ?? [],
				],
			)
			
		}
				
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {
			
			if( delta.values.length === 0 ) return this

			const store = this.to( delta.values[0] as Extract< keyof Types, string >, delta.stamps[0] )
			
			store.apply(
				$mol_crowd_delta(
					delta.values.slice(1),
					delta.stamps.slice(1),
				)
			)
			
			return this
		}
		
	}
	
}
