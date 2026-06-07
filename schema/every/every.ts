namespace $ {
	export let $mol_schema_every = $mol_memo_key.func( function $mol_schema_every<
		Schemas extends readonly( typeof $mol_schema_any )[]
	>( Schemas: Schemas ) {
		
		return class $mol_schema_every_ extends $mol_schema_any {
			
			static Schemas = Schemas
			
			static toString(): string {
				if( this !== $mol_schema_every_ ) return super.toString()
				return '$mol_schema_every<' + $mol_key(Schemas) + '>'
			}	
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				
				for( const Schema of Schemas ) {
					Schema.guard( value )
				}
				
				return value
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				for( const Scheme of Schemas ) value = Scheme.cast( value )
				return value
			}
			
			static default = Schemas.find( Scheme => this.check( Scheme.default ) ) as $mol_type_intersect< Schemas[number]['default'] >
			
		}
		
	} )
}
