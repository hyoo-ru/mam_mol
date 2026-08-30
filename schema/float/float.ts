namespace $ {
	export class $mol_schema_float extends $mol_schema_any {
		static *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): $mol_schema_issues<Value> {
			if( typeof value === 'number' ) return
			yield { message: 'Wrong float', path, value, schema: this }
		}
		
		static default = Number.NaN
		
	}
}
