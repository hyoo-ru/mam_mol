namespace $ {
	export class $mol_schema_any extends Object {
		
		static [ Symbol.toStringTag ]: string
		
		static [ $mol_key_handle ]() {
			return this.toString()
		}
		
		/** Short user-readable identity. */
		static toString() {
			return $$.$mol_func_name( this )
		}
		
		/** Type-guard that checks value by schema. */
		static check< This extends typeof $mol_schema_any, Val >( this: This, val: Val ): val is Val & This['default'] {
			try {
				this.guard( val )
				return true
			} catch( error ) {
				return false
			}
		}
		
		static [ Symbol.hasInstance ]< This extends typeof $mol_schema_any, Val >( this: This, val: Val ): val is Val & This['default'] {
			return this.check( val )
		}
		
		/** Strict parse. Fails of wrong values. */
		static guard< Value >( value: Value ): Value {
			return value
		}
		
		/** Relaxed cast. Normalizes wrong values. */
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			try {
				return this.guard( value )
			} catch ( error ) {
				return this.default
			}
		}
		
		/** Default value which conforms schema. */
		static default = null as unknown
		
	}
}
