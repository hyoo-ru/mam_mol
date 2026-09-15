namespace $ {
	export let $mol_schema_record =  $mol_memo_key.func( function $mol_schema_record<
		Fields extends Record< string, typeof $mol_schema_any >
	>( Fields: Fields ) {
		
		return class $mol_schema_record_ extends $mol_schema_any {
			
			static Fields = Fields
			
			static toString(): string {
				if( this !== $mol_schema_record_ ) return super.toString()
				return '$mol_schema_record<' + $mol_key(Fields) + '>'
			}	
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) {
					return $mol_fail( new TypeError( 'Non record', { cause: { value, schema: this } } ) )
				}
			
				for( const field in Fields ) {
					try {
						Fields[ field ].guard( ( value as any )[ field ] )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong field', { cause: { field, error, value, schema: this } } ) )
					}
				}
				
				return value
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) return this.default
				
				const res = {} as any
				for( const field in Fields ) res[ field ] = Fields[ field ].cast( ( value as any )[ field ] )
				
				return res
			}
			
			static default = Object.fromEntries(
				Object.entries( Fields ).map( ([ field, Field ])=>[ field, Field.default ] )
			) as { readonly [ key in keyof typeof Fields ]:
				typeof Fields[ key ][ 'default' ]
			}
			
		}
		
	} )
}
