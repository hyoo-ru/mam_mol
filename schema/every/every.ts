namespace $ {
	export function $mol_schema_every< Schemas extends readonly( typeof $mol_schema_any )[] >( Schemas: Schemas ) {
		return class $mol_schema_every_ extends $mol_schema_any {
			
			static Schemas = Schemas
			
			static toString(): string {
				if( this !== $mol_schema_every_ ) return super.toString()
				return '$mol_schema_every<' + $mol_key(Schemas) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				
				for( const Schema of Schemas ) {
					Schema.guard( value )
				}
				
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				for( const Scheme of Schemas ) value = Scheme.cast( value )
				return value as typeof this.default
			}
			
			static default = Schemas.find( Scheme => this.check( Scheme.default ) ) as $mol_type_intersect< Schemas[number]['default'] >
			
		}
	}
}
