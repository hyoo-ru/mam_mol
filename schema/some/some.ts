namespace $ {
	export let $mol_schema_some = $mol_memo_key.func( function $mol_schema_some<
		Variants extends readonly( typeof $mol_schema_any )[]
	>( Variants: Variants ) {
		
		return class $mol_schema_some_ extends $mol_schema_any {
			
			static Variants = Variants
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_some<' + $mol_key(Variants) + '>'
			}	
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				
				const errors = [] as unknown[]
				for( const Variant of Variants ) {
					
					try {
						return Variant.guard( value )
					} catch( error ) {
						errors.push( error )
					}
					
				}
				
				return $mol_fail( new AggregateError( errors, 'Wrong variant', { cause: { value, schema: this } } ) )
				
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				try {
					return this.guard( value )
				} catch ( error ) {
					return Variants[0].cast( value )
				}
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
		
	} )
}
