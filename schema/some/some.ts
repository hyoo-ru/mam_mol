namespace $ {
	export function $mol_schema_some< Variants extends readonly( typeof $mol_schema_any )[] >( Variants: Variants ) {
		return class $mol_schema_some_ extends $mol_schema_any {
			
			static Variants = Variants
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_some<' + $mol_key(Variants) + '>'
			}	
			
			static guard< Value >( value: Value ): Value & typeof this.default {
				
				const errors = [] as unknown[]
				for( const Variant of Variants ) {
					
					try {
						return Variant.guard( value )
					} catch( error ) {
						errors.push( error )
					}
					
				}
				
				return $mol_fail( new AggregateError( errors, 'No one variant', { cause: { value, schema: this } } ) )
				
			}
			
			static cast( value: unknown ) {
				try {
					return this.guard( value )
				} catch ( error ) {
					return Variants[0].cast( value ) as typeof this.default
				}
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
	}
}
