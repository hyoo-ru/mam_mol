namespace $ {
	export class $mol_schema_integer extends $mol_schema_float {
		
		$mol_schema_integer = true
		
		static override *issues_lazy<
			This extends typeof $mol_schema_any,
			Value
		>(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		) {
			if (!super.issues_lazy(value, path).next().done)
				yield { message: 'Wrong number', path }
			else if( !Number.isFinite( value as any ) )
				yield { message: 'Non finite', path }
			else if( Math.trunc( value as any ) !== value )
				yield { message: 'Non integer', path }
		}
		
		static default = 0 as number & $mol_schema_integer
		
	}
	
}
