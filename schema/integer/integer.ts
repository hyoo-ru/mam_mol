namespace $ {
	export abstract class $mol_schema_integer extends $mol_schema_float {
		
		$mol_schema_integer = true
		
		static guard< Value >( value: Value ) {
			const val = super.guard( value )
			if( !Number.isFinite( val ) ) return $mol_fail( new TypeError( 'Non finite', { cause: { value, schema: this } } ) )
			if( Math.trunc( val ) !== val ) return $mol_fail( new TypeError( 'Non integer', { cause: { value, schema: this } } ) )
			return val as Value & typeof this.default
		}
		
		static default = 0 as number & $mol_schema_integer
		
	}
	
}
