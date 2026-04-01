namespace $ {
	export function $mol_schema_enum< Options extends readonly unknown[] >( Options: Options ) {
		return class $mol_schema_enum_ extends $mol_schema_any {
			
			static Options = Options
			
			static toString(): string {
				if( this !== $mol_schema_enum_ ) return super.toString()
				return '$mol_schema_enum<' + $mol_key(Options) + '>'
			}	
			
			static guard< Value >( value: Value ): Value & typeof this.default {
				if( Options.some( Option => Object.is( Option, value ) ) ) return value
				return $mol_fail( new TypeError( 'No one option', { cause: { value, schema: this } } ) )
			}
			
			static cast( val: unknown ) {
				if( this.check( val ) ) return val
				return Options[0] as typeof this.default
			}
			
			static default = Options[0] as Options[number]
			
		}
	}
}
