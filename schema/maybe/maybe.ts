namespace $ {
	export function $mol_schema_maybe< Some extends typeof $mol_schema_any >( Some: Some ) {
		return class $mol_schema_maybe_ extends $mol_schema_some([ $mol_schema_enum([ undefined, null ]), Some ]) {
			
			static Some = Some
			
			static toString(): string {
				if( this !== $mol_schema_maybe_ ) return super.toString()
				return '$mol_schema_maybe<' + $mol_key(Some) + '>'
			}	
			
		}
	}
}
