namespace $ {
	export let $mol_schema_pattern = $mol_memo_key.func( function $mol_schema_pattern< Pattern extends RegExp >( Pattern: Pattern ) {
		return class $mol_schema_pattern_ extends $mol_schema_string {
			
			static Pattern = Pattern
			
			static toString(): string {
				if( this !== $mol_schema_pattern_ ) return super.toString()
				return '$mol_schema_pattern<' + $mol_key(Pattern) + '>'
			}
			
			static *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			): $mol_schema_issues {
				yield* super.issues_lazy( value, path )
				if( Pattern.test( value as any ) ) return
				yield { message: 'Wrong pattern', path, kind: "string" }
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				return super.cast( value )
			}
			
			static default = ''
			
		}
	} )
}
