namespace $ {
	export let $mol_schema_dict = $mol_memo_key.func( function $mol_schema_dict< Pair extends [
		Key: typeof $mol_schema_any & { default: PropertyKey },
		Val: typeof $mol_schema_any,
	] >( Pair: Pair ) {
		
		return class $mol_schema_dict_ extends $mol_schema_any {
			
			static Pair = Pair
			
			static toString(): string {
				if( this !== $mol_schema_dict_ ) return super.toString()
				return '$mol_schema_dict<' + $mol_key( Pair ) + '>'
			}
			
			static *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			): $mol_schema_issues {
				try {
					var proto = Object.getPrototypeOf( Object.getPrototypeOf( value ) )
				} catch( error ) {
					yield { message: 'Non dictionary', path, error }
					return
				}
				if ( proto )
					yield { message: 'Non dictionary', path }
				else for( const key in value ) {
					yield* Pair[0].issues_lazy( key, [ ...path, { key } ] )
					for( const i of Pair[1].issues_lazy( ( value as any )[ key ], [ ...path, key ] ) )
						yield { ...i, kind: [ "val", ...i.kind ?? [] ] }
				}
			}
			
			static guard<This extends typeof $mol_schema_any, Value>(this: This, value: Value) {
				if (!value) Object.getPrototypeOf( value )
				return super.guard(value)
			}

			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) return this.default
				
				const res = {} as any
				for( const key in value as any ) {
					if( !Pair[0].check( key ) ) continue
					res[ key ] = Pair[1].cast( ( value as any )[ key ] )
				}
				
				return res
			}
			
			static default = {} as Record< Pair[0]['default'], Pair[1]['default'] >
			
		}
		
	} )
}
