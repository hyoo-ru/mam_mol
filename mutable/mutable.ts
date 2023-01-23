namespace $ {
	
	export type $mol_mutable_wrapper< Value > = {
		(
			patch?: ( next: $mol_type_immutable_deep< Value > )=> $mol_type_immutable_deep< Value >
		): $mol_type_immutable_deep< Value >
	} & {
		[ Field in keyof Value ]: $mol_mutable_wrapper< Value[ Field ] >
	}
	
	export function $mol_mutable< Value >(
		input: Value,
		update: ( next: Value )=> Value = next => input = next,
	): $mol_mutable_wrapper< Value > {
		
		let output = undefined as undefined | Value
		
		const clone = Array.isArray( input )
			? ()=> [ ... input as any ] as Value
			: ()=> ({ ... input })
		
		return new Proxy( $mol_mutable, {
			
			get: ( Mut, field )=> Mut(
				input[ field ],
				next => ( output ?? ( output = update( clone() ) ) )[ field ] = next,
			),
			
			set: ()=> false,
			
			apply: ( Mut, self, [ patch ] )=> {
				if( patch ) update( output = input = patch( input ) )
				return output ?? input
			},
			
		} ) as any
		
	}
	
}