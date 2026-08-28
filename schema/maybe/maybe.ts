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
			
			static override *issues_lazy<
				This extends typeof $mol_schema_any,
				Value
			>(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			) {
				if( value == null ) return
				yield* Some.issues_lazy( value, path )
			}
			
			static default = null as Some['default'] | null
			
		}
		
	} )
}
