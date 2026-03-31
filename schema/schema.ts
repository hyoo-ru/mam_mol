namespace $ {
	
	export abstract class $mol_schema_any extends Object {
		
		static [ Symbol.toStringTag ]: string
		
		static [ $mol_key_handle ]() {
			return this.toString()
		}
		
		/** Short user-readable identity. */
		static toString() {
			return $$.$mol_func_name( this )
		}
		
		/** Type-guard that checks value by schema. */
		static check< Val >( val: Val ): val is Val & typeof this.default {
			try {
				this.guard( val )
				return true
			} catch( error ) {
				return false
			}
		}
		
		/** Strict parse. Fails of wrong values. */
		static guard< Value >( value: Value ): Value {
			return value
		}
		
		/** Relaxed cast. Normalizes wrong values. */
		static cast( value: unknown ): unknown {
			try {
				return this.guard( value )
			} catch ( error ) {
				return this.default
			}
		}
		
		/** Default value which conforms schema. */
		static default = undefined as unknown
		
	}
	
	export function $mol_schema_some< Variants extends readonly( typeof $mol_schema_any )[] >( Variants: Variants ) {
		return class $mol_schema_some_ extends $mol_schema_any {
			
			static Variants = Variants
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_some<' + $mol_key(Variants) + '>'
			}	
			
			static guard< Value >( value: Value ): Value & typeof this.default {
				
				const errors = [] as unknown[]
				for( const Variant of Variants ) {
					
					try {
						return Variant.guard( value )
					} catch( error ) {
						errors.push( error )
					}
					
				}
				
				return $mol_fail( new AggregateError( errors, 'No one variant', { cause: { value, schema: this } } ) )
				
			}
			
			static cast( value: unknown ) {
				try {
					return this.guard( value )
				} catch ( error ) {
					return Variants[0].cast( value ) as typeof this.default
				}
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
	}
	
	export function $mol_schema_maybe< Some extends typeof $mol_schema_any >( Some: Some ) {
		return class $mol_schema_maybe_ extends $mol_schema_some([ $mol_schema_enum([ undefined, null ]), Some ]) {
			
			static Some = Some
			
			static toString(): string {
				if( this !== $mol_schema_maybe_ ) return super.toString()
				return '$mol_schema_maybe<' + $mol_key(Some) + '>'
			}	
			
		}
	}
	
	export function $mol_schema_every< Schemas extends readonly( typeof $mol_schema_any )[] >( Schemas: Schemas ) {
		return class $mol_schema_every_ extends $mol_schema_any {
			
			static Schemas = Schemas
			
			static toString(): string {
				if( this !== $mol_schema_every_ ) return super.toString()
				return '$mol_schema_every<' + $mol_key(Schemas) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				
				for( const Schema of Schemas ) {
					Schema.guard( value )
				}
				
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				for( const Scheme of Schemas ) value = Scheme.cast( value )
				return value as typeof this.default
			}
			
			static default = Schemas.find( Scheme => this.check( Scheme.default ) ) as $mol_type_intersect< Schemas[number]['default'] >
			
		}
	}
	
	export abstract class $mol_schema_list_any extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( Array.isArray( value ) ) return value
			return $mol_fail( new TypeError( 'Non array', { cause: { value, schema: this } } ) )
		}
		
		static cast( value: unknown ) {
			try {
				return this.guard( value )
			} catch( error ) {
				return this.default
			}
		}
		
		static default = [] as readonly unknown[]
		
	}
	
	export function $mol_schema_list< Item extends typeof $mol_schema_any >( Item: Item ) {
		return class $mol_schema_list_ extends $mol_schema_list_any {
			
			static Item = Item
			
			static toString(): string {
				if( this !== $mol_schema_list_ ) return super.toString()
				return '$mol_schema_list<' + $mol_key(Item) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				
				for( const [ index, item ] of super.guard( value ).entries() ) {
					try {
						Item.guard( item )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong item', { cause: { index, error, value, schema: this } } ) )
					}
				}
				
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				if( !Array.isArray( value ) ) return this.default
				return value.map( item => Item.cast( item ) ) as typeof this.default
			}
			
			static default = [] as readonly( typeof Item.default )[]
			
		}
	}
	
	export abstract class $mol_schema_dict_any extends $mol_schema_any {
		
		static guard< Value >( value: Value ) {
			if( ! Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) return value as Value & typeof this.default
			return $mol_fail( new TypeError( 'Non dictionary', { cause: { value, schema: this } } ) )
		}
		
		static cast( value: unknown ) {
			try {
				return this.guard( value )
			} catch( error ) {
				return this.default
			}
		}
		
		static default = {} as Readonly< Record< string, unknown > >
		
	}
	
	export function $mol_schema_dict< Fields extends Record< string, typeof $mol_schema_any > >( Fields: Fields ) {
		return class $mol_schema_dict_ extends $mol_schema_dict_any {
			
			static Fields = Fields
			
			static toString(): string {
				if( this !== $mol_schema_dict_ ) return super.toString()
				return '$mol_schema_dict<' + $mol_key(Fields) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				for( const field in Fields ) {
					try {
						Fields[ field ].guard( ( value as any )[ field ] )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong field', { cause: { field, error, value, schema: this } } ) )
					}
				}
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) return this.default
				const res = {} as any
				for( const key in Fields ) res[ key ] = Fields[key].cast( ( value as any )[ key ] )
				return res as typeof this.default
			}
			
			static default = Object.fromEntries(
				Object.entries( Fields ).map( ([ key, Val ])=>[ key, Val.default ] )
			) as { readonly [ key in keyof typeof Fields ]:
				typeof Fields[ key ][ 'default' ]
			}
			
		}
	}
	
	export function $mol_schema_enum< Options extends readonly unknown[] >( Options: Options ) {
		return class $mol_schema_enum_ extends $mol_schema_any {
			
			static Options = Options
			
			static toString(): string {
				if( this !== $mol_schema_enum_ ) return super.toString()
				return '$mol_schema_enum<' + $mol_key(Options) + '>'
			}	
			
			static guard< Value >( value: Value ): Value & typeof this.default {
				if( Options.some( Option => Object.is( Option, value ) ) ) return value
				return $mol_fail( new TypeError( 'No one option', { cause: { value, schema: this } } ) )
			}
			
			static cast( val: unknown ) {
				if( this.check( val ) ) return val
				return Options[0] as typeof this.default
			}
			
			static default = Options[0] as Options[number]
			
		}
	}
	
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
	
	export abstract class $mol_schema_bool extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'boolean' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static default = false
		
	}
	
	export abstract class $mol_schema_string extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'string' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static default = ''
		
	}
	
	export abstract class $mol_schema_float extends $mol_schema_any {
		
		static guard< Value >( value: Value ): Value & typeof this.default {
			if( typeof value === 'number' ) return value
			return $mol_fail( new TypeError( 'Wrong type', { cause: { value, schema: this } } ) )
		}
		
		static default = Number.NaN
		
	}
	
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
	
	export abstract class $mol_schema_positive extends $mol_schema_range( 0, Number.POSITIVE_INFINITY ) {}
	export abstract class $mol_schema_negative extends $mol_schema_range( Number.NEGATIVE_INFINITY, 0 ) {}
	
	export abstract class $mol_schema_natural extends $mol_schema_every([
		$mol_schema_integer,
		$mol_schema_positive,
	]) {}
	
}
