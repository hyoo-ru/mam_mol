namespace $ {
	export class $mol_schema_float extends $mol_schema_any {
		static override *issues_lazy<This extends typeof $mol_schema_any, Value>(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		) {
			if (typeof value === 'number') return
			yield { message: 'Wrong float', path }
		}
		
		static default = Number.NaN
		
	}
}
