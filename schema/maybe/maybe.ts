namespace $ {
	export let $mol_schema_maybe = $mol_memo_key.func( function $mol_schema_maybe<
		Some extends typeof $mol_schema_any
	>( Some: Some ) {
		
		return class $mol_schema_maybe_ extends $mol_schema_any {
			
			static Some = Some
			
			static toString(): string {
				if( this !== $mol_schema_maybe_ ) return super.toString()
				return '$mol_schema_maybe<' + $mol_key(Some) + '>'
			}
			
			static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
				if( value == null ) return value
				return Some.guard( value )
			}
			
			static default = null as Some['default'] | null
			
		}
		
	} )
}
