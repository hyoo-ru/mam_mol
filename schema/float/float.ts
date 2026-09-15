namespace $ {
	export class $mol_schema_float extends $mol_schema_any {
		
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			if( typeof value === 'number' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static default = Number.NaN
		
	}
}
