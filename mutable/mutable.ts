namespace $ {
	
	export type $mol_mutable_wrapper< Value > = {
		( patch?: ( next: Value )=> Value ): Value
	} & {
		[ Field in keyof Value ]: $mol_mutable_wrapper< Value[ Field ] >
	}
	
	export function $mol_mutable< Value >(
		value: Value,
		update: ( next: Value )=> Value = next => value = next,
	): $mol_mutable_wrapper< Value > {
		
		return new Proxy( $mol_mutable, {
			
			get: ( mutable, field )=> mutable(
				value[ field ],
				next => {
					const next2 = Array.isArray( value ) && typeof field === 'string'
						? [
							... value.slice( 0, Number( field ) ),
							next,
							... value.slice( Number( field ) + 1 ),
						] as Value
						: { ... value, [ field ]: next }
					value = update( next2 )
					return value[ field ]
				},
			),
			
			set: ( mutable, field, next )=> {
				value = update( next )
				return true
			},
			
			apply: ( mutable, self, [ patch ] )=> {
				if( !patch ) return value
				return value = update( patch( value ) )
			},
			
		} ) as any
		
	}
	
}