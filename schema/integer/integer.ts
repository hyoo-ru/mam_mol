namespace $ {
	export class $mol_schema_integer extends $mol_schema_float {
		
		$mol_schema_integer = true
		
		static *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): $mol_schema_issues {
			const { value: issue, done } = super.issues_lazy( value, path ).next()
			if( !done )
				yield {
					message: 'Wrong number',
					path, value, schema: this,
					issues: (function* () { yield issue })()
				}
			else if( !Number.isFinite( value as any ) )
				yield { message: 'Non finite', path, value, schema: this }
			else if( Math.trunc( value as any ) !== value )
				yield { message: 'Non integer', path, value, schema: this }
		}
		
		static default = 0 as number & $mol_schema_integer
		
	}
	
}