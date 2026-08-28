namespace $ {
	export class $mol_schema_bigint extends $mol_schema_any {
		
		static *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): $mol_schema_issues {
			if( typeof value === 'bigint' ) return
			yield { message: 'Wrong bigint', path, kind: "type" }
		}
		
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			if( typeof value === 'number' ) return BigInt( $mol_schema_integer.cast( value ) )
			return super.cast( value )
		}
		
		static default = 0n
		
	}
}
