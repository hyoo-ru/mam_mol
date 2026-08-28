namespace $ {
	
	export type $mol_schema_issue_path = ReadonlyArray<PropertyKey | { key: PropertyKey }>
	export type $mol_schema_issue = {
		readonly message: string
		readonly path: $mol_schema_issue_path
		readonly issues?: Generator<$mol_schema_issue, void, unknown>
	}

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
			return this.issues_lazy( value ).next().done || false
		}
		
		/** `instanceof` support */
		static [ Symbol.hasInstance ]< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): value is Value & This['default'] {
			return this.check( value )
		}
		
		/** Type-parser that fails of wrong values. */
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			const { value: issue } = this.issues_lazy( value ).next()
			if( issue ) $mol_fail( new TypeError( issue.message, { cause: { ...issue, value, schema: this } } ) )
			return value
		}
		
		/** Type-caster that normalizes wrong values. */
		static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
			if( this.issues_lazy( value ).next().done ) return value
			return this.default
		}
		
		/** Default value which conforms schema. */
		static default = null as unknown

		static *issues_lazy< This extends typeof $mol_schema_any, Value >(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): Generator<$mol_schema_issue, void, unknown> {}

		static issues< This extends typeof $mol_schema_any, Value >( this: This, value: Value ) {
			type Issue = Omit< $mol_schema_issue, 'issues' > & { issues?: Issue[] }
			const issue = ( i: $mol_schema_issue ): Issue => {
				const { issues } = i
				if( issues ) return {
					...i,
					get issues() {
						return Array.from( issues, issue )
					},
				}
				return i as Issue
			}
			return Array.from( this.issues_lazy( value ), issue )
		}
		
		static get ['~standard']() {
			return {
				version: 1,
				vendor: '$mol_schema',
				validate: ( value: unknown )=> {
					const issues = this.issues_lazy( value )
					const first = issues.next()
					if( first.done ) return { value }
					return { get issues() { return [ first, ...issues ] } }
				}
			}
		}

	}
}
