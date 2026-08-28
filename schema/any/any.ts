namespace $ {
	
	export type $mol_schema_issue_path = ReadonlyArray<PropertyKey | { key: PropertyKey }>
	export type $mol_schema_issue = {
		readonly message: string
		readonly path: $mol_schema_issue_path
		readonly issues?: $mol_schema_issues
		readonly kind?: string | undefined
	}
	export type $mol_schema_issues = IterableIterator<$mol_schema_issue, void, unknown>

	class AggregationErrorLazy extends AggregateError {
		constructor(errors_: () => Iterable<Error>, message: string, options: ErrorOptions) {
			super([], message, options)
			Object.defineProperty(this, 'errors', {
				get: () => [ ...errors_() ],
				enumerable: false,
				configurable: true,
			})
		}
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
		
		static _get_error( { issues, path, kind, message }: $mol_schema_issue, options: ErrorOptions): Error {
			const last = path.at(-1)
			if( typeof last === "object" ) message = "Wrong key"
			else if( typeof last === "number" ) message = "Wrong item"
			else if( kind ) message = `Wrong ${kind}`
			const self = this
			if( issues ) return new AggregationErrorLazy(
				function* () { for( const i of issues ) yield self._get_error( i, options ) }, // issues.map
				message,
				options
			)
			return new TypeError( message, options )
		}

		/** Type-parser that fails of wrong values. */
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			const issues = this.issues_lazy( value )
			const { value: first, done } = issues.next()
			if( done ) return value
			const options = { cause: { value, schema: this } }
			const f = this._get_error( first, options )
			const { value: second, done: d } = issues.next()
			if( d ) return $mol_fail( f )
			const self = this
			return $mol_fail( new AggregationErrorLazy( function*() {
				yield f
				yield self._get_error( second, options )
				for( const i of issues ) yield self._get_error( i, options )
			}, f.message, options ) )
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
		): IterableIterator<$mol_schema_issue, void, unknown> {}

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
