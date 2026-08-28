namespace $ {
	export let $mol_schema_record = $mol_memo_key.func( function $mol_schema_record<
		Fields extends Record< string, typeof $mol_schema_any >
	>( Fields: Fields ) {
		
		return class $mol_schema_record_ extends $mol_schema_any {
			
			static Fields = Fields
			
			static toString(): string {
				if( this !== $mol_schema_record_ ) return super.toString()
				return '$mol_schema_record<' + $mol_key(Fields) + '>'
			}	
			
			static override *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			) {
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) )
					yield { message: 'Non record', path }
				else for( const field in Fields )
					for( const i of Fields[ field ].issues_lazy( ( value as any )[ field ], [ ...path, field ] ) )
						yield {...i, kind: "field" }
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
