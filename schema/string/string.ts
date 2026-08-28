namespace $ {
	export class $mol_schema_string extends $mol_schema_any {
		
		static override *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		) {
			if( typeof value === 'string' ) return
			yield { message: 'Wrong string', path: path, kind: "type" }
		}
		
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			return super.cast( value )
		}
		
		static default = ''
		
	}
}
