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
			
			static *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			): $mol_schema_issues<Value> {
				if( !value || Object.getPrototypeOf( Object.getPrototypeOf( value ) ) )
					yield { message: 'Non record', path, value, schema: this }
				else {
					const errors = []
					for( const field in Fields ) {
						const schema = Fields[ field ]
						const value_ = ( value as any )[ field ]
						const path_ = [ ...path, field ]
						try {
							yield* schema.issues_lazy( value_, path_ )
						} catch( error ) {
							if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
							else errors.push(new Error( 'Wrong schema', { cause: { e: error, value: value_, path: path_, schema }  } ) )
						}
					}
					if( errors.length === 0 ) return
					else if( errors.length === 1 ) $mol_fail( errors[0] )
					else $mol_fail( new AggregateError( errors, 'Wrong schemas', { cause: { path, value, schema: this } } ) )
				}
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
