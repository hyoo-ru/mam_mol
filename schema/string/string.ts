namespace $ {
	export abstract class $mol_schema_string extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'string' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static cast( value: unknown ) {
			return super.cast( value ) as typeof this.default
		}
		
		static default = ''
		
	}
}
