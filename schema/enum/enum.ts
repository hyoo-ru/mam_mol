namespace $ {
	export let $mol_schema_enum = $mol_memo_key.func( function $mol_schema_enum<
		const Options extends readonly unknown[]
	>( Options: Options ) {
		
		return class $mol_schema_enum_ extends $mol_schema_any {
			
			static Options = Options
			
			static toString(): string {
				if( this !== $mol_schema_enum_ ) return super.toString()
				return '$mol_schema_enum<' + $mol_key(Options) + '>'
			}	
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				if( Options.some( Option => Object.is( Option, value ) ) ) return value
				return $mol_fail( new TypeError( 'Wrong option', { cause: { value, schema: this } } ) )
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				if( this.check( value ) ) return value
				return Options[0] as typeof this.default
			}
			
			static default = Options[0] as Options[number]
			
		}
		
	} )
}
