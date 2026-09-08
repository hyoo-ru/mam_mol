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
		
		/** Type-predicate that checks value by schema. */
		static check< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): value is Value & This['default'] {
			try {
				this.guard( value )
				return true
			} catch( error ) {
				return false
			}
		}
		
		/** `instanceof` support */
		static [ Symbol.hasInstance ]< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): value is Value & This['default'] {
			return this.check( value )
		}
		
		/** Type-parser that fails of wrong values. */
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			return value
		}
		
		/** Type-caster that normalizes wrong values. */
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			try {
				this.guard( value )
				return value
			} catch ( error ) {
				return this.default
			}
		}
		
		/** Default value which conforms schema. */
		static default = null as unknown
		
	}
}
