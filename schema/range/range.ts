namespace $ {
	export let $mol_schema_range = $mol_memo_key.func( function $mol_schema_range<
		Value extends number | bigint,
		Range extends [ min: Value, max: Value ]
	>( Range: Range ) {
		return class $mol_schema_range_ extends $mol_schema_any {
			
			static Range = Range
			
			static toString(): string {
				if( this !== $mol_schema_range_ ) return super.toString()
				return '$mol_schema_range<' + $mol_key(Range) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				if( typeof value !== 'number' && typeof value !== 'bigint' ) return $mol_fail( new TypeError( 'Uncomparable type', { cause: { value, schema: this } } ) )
				if(!( value <= Range[1] )) return $mol_fail( new TypeError( 'Too large', { cause: { value, schema: this } } ) )
				if(!( value >= Range[0] )) return $mol_fail( new TypeError( 'Too small', { cause: { value, schema: this } } ) )
				return value as Value & typeof this.default
			}
			
			static cast( val: Value ) {
				if( val > Range[1] ) return Range[1]
				if( val >= Range[0] ) return val
				return Range[0] as any as typeof this.default
			}
			
			static default = Range[0] as any as Value & { [ key in `$mol_schema_range_min=${Range[0]}` ]: true } & { [ key in `$mol_schema_range_max=${Range[1]}` ]: true }
			
		}
	} )
}
