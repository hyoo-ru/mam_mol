namespace $ {
	export class $mol_schema_string extends $mol_schema_any {
		
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			if( typeof value === 'string' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			return super.cast( value )
		}
		
		static default = ''
		
	}
}
