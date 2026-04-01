namespace $ {
	export function $mol_schema_pattern< Pattern extends RegExp >( Pattern: Pattern ) {
		return class $mol_schema_pattern_ extends $mol_schema_string {
			
			static Pattern = Pattern
			
			static toString(): string {
				if( this !== $mol_schema_pattern_ ) return super.toString()
				return '$mol_schema_pattern<' + $mol_key(Pattern) + '>'
			}
			
			static guard< Value >( value: Value ) {
				if( Pattern.test( super.guard( value ) ) ) return value as Value & typeof this.default
				return $mol_fail( new TypeError( 'Wrong string', { cause: { value, schema: this } } ) )
			}
			
			static cast( value: unknown ) {
				return super.cast( value ) as typeof this.default
			}
			
			static default = ''
			
		}
	}
}
