namespace $ {
	export class $mol_schema_boolean extends $mol_schema_any {
		
		static *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): $mol_schema_issues {
			if( typeof value === 'boolean' ) return
			yield { message: 'Wrong boolean', path, kind: "type" }
		}
		
		static default = false
		
	}
}
