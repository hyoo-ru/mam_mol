namespace $ {
	
	export type $mol_mutable_wrapper< Value > = {
		( patch?: ( next: $mol_type_immutable_deep< Value > )=> $mol_type_immutable_deep< Value > ): $mol_type_immutable_deep< Value >
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
				Array.isArray( value )
					? next => update( value = [
						... ( value as any[] ).slice( 0, Number( field ) ),
						next,
						... ( value as any[] ).slice( Number( field ) + 1 ),
					] as Value )[ field ]
					: next => update( value = { ... value, [ field ]: next } )[ field ],
			),
			
			set: ( mutable, field, next )=> {
				update( value = next )
				return true
			},
			
			apply: ( mutable, self, [ patch ] )=> {
				if( patch ) update( value = patch( value ) )
				return value
			},
			
		} ) as any
		
	}
	
}