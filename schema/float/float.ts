namespace $ {
	export abstract class $mol_schema_float extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'number' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static default = Number.NaN
		
	}
}
