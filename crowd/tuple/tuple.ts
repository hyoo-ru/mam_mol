namespace $ {
	
	/** CROWD Tuple */
	export class $mol_crowd_tuple<
		Fields extends Record< string, typeof $mol_crowd_store >
	> extends $mol_crowd_store {
		
		static of<
			Types extends Record< string, typeof $mol_crowd_store >
		>(
			Types: Types,
		) {
			return class Union extends this<Types> {
				Fields = Types
			}
		}
		
		Fields!: Fields
		
		stores = {} as {
			[ key in keyof Fields ]: InstanceType< Fields[ key ] >
		}
		
		for< Field extends keyof Fields >( field: Field ): InstanceType< Fields[ Field ] > {
			
			if( this.stores[ field ] ) return this.stores[ field ]
			
			this.stores[ field as keyof Fields ] = new this.Fields[ field ]( this.stamper ) as InstanceType< Fields[string] >
			return this.stores[ field ]
			
		}
		
		toJSON( version_min = 0 ) {
			
			const delta = $mol_crowd_delta([],[])
			
			for( let field in this.Fields ) {
				const patch = this.for( field ).toJSON( version_min )
				if( patch.values.length === 0 ) continue
				delta.values.push( field, ... patch.values )
				delta.stamps.push( - patch.values.length, ... patch.stamps )
			}
			
			return delta
		}
				
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >
		) {
			
			let key: string
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
					key = val as string
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
