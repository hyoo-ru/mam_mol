namespace $ {
	export abstract class $mol_schema_bigint extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'bigint' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			if( typeof value === 'number' ) return BigInt( $mol_schema_integer.cast( value ) )
			return super.cast( value )
		}
		
		static default = 0n
		
	}
}
