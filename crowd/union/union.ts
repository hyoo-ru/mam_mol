namespace $ {
	
	/** CROWD Register */
	export class $mol_crowd_union<
		Types extends Record< string, typeof $mol_crowd_store >
	> extends $mol_crowd_store {
		
		static of<
			Types extends Record< string, typeof $mol_crowd_store >
		>(
			Types: Types,
		) {
			return class Union extends this<Types> {
				Types = Types
			}
		}
		
		Types!: Types
		
		type_store = new $mol_crowd_reg( this.stamper )
		value_store?: InstanceType< Types[string] >
		
		get type() {
			const type = this.type_store.value
			return type as keyof Types | null
		}
		
		as< Type extends keyof Types >( type: Type ): InstanceType< Types[ Type ] > | null {
			
			if( this.type !== type ) return null
			if( this.value_store ) return this.value_store as InstanceType< Types[ Type ] >
			
			return this.to( type )
		}
		
		to< Type extends keyof Types >( type: Type, stamp?: number ): InstanceType< Types[ Type ] > {
			
			if( this.type === type ) return this.as( type )!
			
			this.type_store.apply(
				$mol_crowd_delta(
					[ type as string ],
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
