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
		static cast( value: unknown ): typeof this.default {
			try {
				return this.guard( value )
			} catch ( error ) {
				return this.default
			}
		}
		
		/** Default value which conforms schema. */
		static default = undefined as unknown
		
	}
}
