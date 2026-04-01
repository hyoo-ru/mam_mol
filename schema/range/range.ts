namespace $ {
	export function $mol_schema_range< Value extends number | bigint, Min extends Value, Max extends Value >( Min: Min, Max: Max ) {
		return class $mol_schema_range_ extends $mol_schema_any {
			
			static Min = Min
			static Max = Max
			
			static toString(): string {
				if( this !== $mol_schema_range_ ) return super.toString()
				return '$mol_schema_range<' + $mol_key(Min) + ',' + $mol_key(Max) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				if( typeof value !== 'number' && typeof value !== 'bigint' ) return $mol_fail( new TypeError( 'Uncomparable type', { cause: { value, schema: this } } ) )
				if(!( value <= Max )) return $mol_fail( new TypeError( 'Too large', { cause: { value, schema: this } } ) )
				if(!( value >= Min )) return $mol_fail( new TypeError( 'Too small', { cause: { value, schema: this } } ) )
				return value as Value & typeof this.default
			}
			
			static cast( val: Value ) {
				if( val > Max ) return Max
				if( val >= Min ) return val
				return Min as any as typeof this.default
			}
			
			static default = Min as any as Value & { [ key in `$mol_schema_range_min=${Min}` ]: true } & { [ key in `$mol_schema_range_max=${Max}` ]: true }
			
		}
	}
}
