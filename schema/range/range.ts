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

			static *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			): $mol_schema_issues {
				if( typeof value !== 'number' && typeof value !== 'bigint' )
					yield { message: 'Uncomparable type', path, value, schema: this }
				else if(!( value <= Range[1] ))
					yield { message: 'Too large', path, value, schema: this }
				else if(!( value >= Range[0] ))
					yield { message: 'Too small', path, value, schema: this }
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: Value ): This['default'] {
				if( value > Range[1] ) return Range[1]
				if( value >= Range[0] ) return value
				return Range[0] as any as typeof this.default
			}
			
			static default = Range[0] as any as Range[0] & { [ key in `$mol_schema_range_min=${Range[0]}` ]: true } & { [ key in `$mol_schema_range_max=${Range[1]}` ]: true }
			
		}
	} )
}
