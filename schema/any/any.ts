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
			const { value: issue } = this.issues_lazy(value).next()
			return !issue
		}
		
		/** `instanceof` support */
		static [ Symbol.hasInstance ]< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): value is Value & This['default'] {
			return this.check( value )
		}
		
		/** Type-parser that fails of wrong values. */
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			const { value: issue } = this.issues_lazy(value).next()
			if (issue) $mol_fail(new TypeError(issue.message, { cause: { value, schema: this, path: issue.path } }))
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

		static *issues_lazy<This extends typeof $mol_schema_any, Value>(
			this: This,
			value: Value,
			path: $mol_schema_issue_path = [],
		): Generator<$mol_schema_issue, void, unknown> {}

		static issues<This extends typeof $mol_schema_any, Value>(value: Value) {
			type Issue = Omit<$mol_schema_issue, 'issues'> & { issues?: Issue[] }
			const issue = (i: $mol_schema_issue): Issue => {
				const { issues } = i
				if (issues)
					return {
						...i,
						get issues() {
							return Array.from(issues, issue)
						},
					}
				return i as Issue
			}
			return Array.from(this.issues_lazy(value), issue)
		}
		
	}
}
