namespace $ {
	
	export abstract class $mol_schema extends Object {
		
		static [ Symbol.toStringTag ]: string
		
		static [ $mol_key_handle ]() {
			return this.toString()
		}
		
		/** Short user-readable identity. */
		static toString() {
			return $$.$mol_func_name( this )
		}
		
		/** Type-guard that checks value by schema. */
		static check( val: unknown ) {
			return false
		}
		
		/** Strict parse. Fails of wrong values. */
		static guard< Val >( val: Val ): Val {
			if( this.check( val ) ) return val
			return $mol_fail( new Error( 'Guard fail', { cause: { val, schema: this } } ) )
		}
		
		/** Relaxed cast. Normalizes wrong values. */
		static cast( val: unknown ): unknown {
			return this.check( val ) ? val : this.default
		}
		
		/** Default value which conforms schema. */
		static default = undefined as unknown
		
	}
	
	export function $mol_schema_enum< Options extends readonly unknown[] >( Options: Options ) {
		return class $mol_schema_enum_ extends $mol_schema {
			
			static Options = Options
			
			static toString(): string {
				if( this !== $mol_schema_enum_ ) return super.toString()
				return '$mol_schema_enum<' + $mol_key(Options) + '>'
			}	
			
			static check( val: unknown ): val is typeof this.default {
				return Options.some( Option => Object.is( Option, val ) )
			}
			
			static cast( val: unknown ) {
				if( this.check( val ) ) return val
				return Options[0] as typeof this.default
			}
			
			static default = Options[0] as Options[number]
			
		}
	}
	
	export function $mol_schema_some< Variants extends readonly( typeof $mol_schema )[] >( Variants: Variants ) {
		return class $mol_schema_some_ extends $mol_schema {
			
			static Variants = Variants
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_some<' + $mol_key(Variants) + '>'
			}	
			
			static check( val: unknown ): val is typeof this.default {
				return Variants.some( Variant => Variant.check( val ) )
			}
			
			static cast( val: unknown ) {
				if( this.check( val ) ) return val
				return Variants[0].cast( val ) as typeof this.default
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
	}
	
	export function $mol_schema_every< Schemes extends readonly( typeof $mol_schema )[] >( Schemes: Schemes ) {
		return class $mol_schema_some_ extends $mol_schema {
			
			static Schemes = Schemes
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_every<' + $mol_key(Schemes) + '>'
			}	
			
			static check( val: unknown ): val is typeof this.default {
				return Schemes.every( Variant => Variant.check( val ) )
			}
			
			static cast( val: unknown ) {
				for( const Scheme of Schemes ) val = Scheme.cast( val )
				return val as typeof this.default
			}
			
			static default = Schemes.find( Scheme => this.check( Scheme.default ) ) as $mol_type_intersect< Schemes[number]['default'] >
			
		}
	}
	
	export function $mol_schema_range< Value extends number, Min extends Value, Max extends Value >( Min: Min, Max: Max ) {
		return class $mol_schema_range_ extends $mol_schema {
			
			static Min = Min
			static Max = Max
			
			static toString(): string {
				if( this !== $mol_schema_range_ ) return super.toString()
				return '$mol_schema_range<' + $mol_key(Min) + ',' + $mol_key(Max) + '>'
			}	
			
			static check( val: Value ): val is typeof this.default {
				return val >= Min && val <= Max
			}
			
			static cast( val: Value ) {
				if( val > Max ) return Max
				if( val >= Min ) return val
				return Min
			}
			
			static default = Min as any as Value & { [ key in `$mol_schema_range_min=${Min}` ]: true } & { [ key in `$mol_schema_range_max=${Max}` ]: true }
			
		}
	}
	
	export abstract class $mol_schema_boolean extends $mol_schema {
		
		static check( val: unknown ): val is boolean {
			return typeof val === 'boolean'
		}
		
		static default = false
		
	}
	
	export abstract class $mol_schema_string extends $mol_schema {
		
		static check( val: unknown ): val is string {
			return typeof val === 'string'
		}
		
		static default = ''
		
	}
	
	export abstract class $mol_schema_float extends $mol_schema {
		
		static check( val: unknown ): val is number {
			return typeof val === 'number'
		}
		
		static default = Number.NaN
		
	}
	
	export abstract class $mol_schema_integer extends $mol_schema_float {
		
		$mol_schema_integer = undefined
		
		static check( val: unknown ): val is number {
			return super.check( val )
				&& Number.isFinite( val )
				&& Math.trunc( val ) === val
		}
		
		static default = 0 as number & $mol_schema_integer
		
	}
	
	export abstract class $mol_schema_positive extends $mol_schema_range( 0, Number.POSITIVE_INFINITY ) {}
	export abstract class $mol_schema_negative extends $mol_schema_range( Number.NEGATIVE_INFINITY, 0 ) {}
	
	export abstract class $mol_schema_natural extends $mol_schema_every([
		$mol_schema_integer,
		$mol_schema_positive,
	]) {}
	
	export abstract class $mol_schema_list extends $mol_schema {
		
		static check( val: unknown ): val is readonly unknown[] {
			return Array.isArray( val )
		}
		
		static default = [] as readonly unknown[]
		
	}
	
	export function $mol_schema_array< Item extends typeof $mol_schema >( Item: Item ) {
		return class $mol_schema_array_ extends $mol_schema_list {
			
			static Item = Item
			
			static toString(): string {
				if( this !== $mol_schema_array_ ) return super.toString()
				return '$mol_schema_array<' + $mol_key(Item) + '>'
			}	
			
			static check( val: unknown ): val is typeof this.default {
				return super.check( val )
					&& val.every( item => Item.check( item ) )
			}
			
			static cast( val: unknown ) {
				if( !super.check( val ) ) return this.default
				return val.map( item => Item.cast( item ) ) as typeof this.default
			}
			
			static default = [] as readonly( typeof Item.default )[]
			
		}
	}
	
	export abstract class $mol_schema_object extends $mol_schema {
		
		static check( val: unknown ): val is Readonly< Record< string, unknown > > {
			return ! Object.getPrototypeOf( Object.getPrototypeOf( val ) )
		}
		
		static default = {} as Readonly< Record< string, unknown > >
		
	}
	
	export function $mol_schema_record< Fields extends Record< string, typeof $mol_schema > >( Fields: Fields ) {
		return class $mol_schema_record_ extends $mol_schema_object {
			
			static Fields = Fields
			
			static toString(): string {
				if( this !== $mol_schema_record_ ) return super.toString()
				return '$mol_schema_record<' + $mol_key(Fields) + '>'
			}	
			
			static check( val: unknown ): val is typeof this.default {
				if( !super.check( val ) ) return false
				for( const key in Fields ) {
					if( !Fields[ key ].check( val[ key ] ) ) return false
				}
				return true
			}
			
			static cast( val: unknown ) {
				if( !super.check( val ) ) return this.default
				const res = {} as any
				for( const key in Fields ) res[ key ] = Fields[key].cast( val[ key ] )
				return res as typeof this.default
			}
			
			static default = Object.fromEntries(
				Object.entries( Fields ).map( ([ key, Val ])=>[ key, Val.default ] )
			) as { readonly [ key in keyof typeof Fields ]:
				typeof Fields[ key ][ 'default' ]
			}
			
		}
	}
	
}
