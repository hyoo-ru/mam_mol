namespace $ {
	export let $mol_schema_pattern = $mol_memo_key.func( function $mol_schema_pattern< Pattern extends RegExp >( Pattern: Pattern ) {
		return class $mol_schema_pattern_ extends $mol_schema_string {
			
			static Pattern = Pattern
			
			static toString(): string {
				if( this !== $mol_schema_pattern_ ) return super.toString()
				return '$mol_schema_pattern<' + $mol_key(Pattern) + '>'
			}
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				if( Pattern.test( super.guard( value ) ) ) return value
				return $mol_fail( new TypeError( 'Wrong string', { cause: { value, schema: this } } ) )
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				return super.cast( value )
			}
			
			static default = ''
			
		}
	} )
}
