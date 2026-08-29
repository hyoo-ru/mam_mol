namespace $ {
	
	export type $mol_schema_issue_path = ReadonlyArray<PropertyKey | { key: PropertyKey }>
	export type $mol_schema_issue = {
		readonly message: string
		readonly path: $mol_schema_issue_path
		readonly issues?: $mol_schema_issues
		readonly kind?: string[] | undefined // For backward compatibility as "Wrong field" / "Wrong type"
		readonly error?: unknown // For backward compatibility with "Cannot convert undefined or null to object"
	}
	export type $mol_schema_issues = IterableIterator<$mol_schema_issue, void, unknown>

	class AggregateErrorLazy extends AggregateError {
		constructor(
			errors: () => Iterable<unknown, void, unknown>,
			message: string,
			options?: ErrorOptions
		) {
			super( [], message, options )
			Object.defineProperty( this, "errors", { get: $mol_memo.func(()=>[ ...errors() ]) } )
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
		
		static _get_value(value: any, path: $mol_schema_issue_path) {
			for( const key of path ) {
				if( typeof key === "object" ) return key.key
				value = value?.[key]
			}
			return value
		}

		static _get_error( { issues, path: [ p, ... path ], kind, message, error }: $mol_schema_issue, value: unknown): unknown {
			if( error ) return error
			const cause = { value, schema: this } as Record<string, unknown>
			const v = this._get_value(value, [p])
			const m = message
			const self = this

			const add_error = (kind?: string[]) => Object.defineProperty( cause, 'error', {
				get: $mol_memo.func( () => this._get_error({ message: m, path, issues, kind }, v ) ),
				enumerable: true,
			} )
			if( typeof p === "object" ) {
				add_error(kind)
				message = "Wrong key"
				cause.key = p.key
			} else if( typeof p === "number" ) {
				add_error(kind)
				message = "Wrong item"
				cause.index = p
			} else if( kind?.[0] ) {
				const [ k, ...other ] = kind ?? []
				if( p ) {
					add_error(other)
					cause[ k === "val" ? "key" : k ] = p
				}
				message = `Wrong ${k}`
			}

			if( !issues ) return new TypeError( message, { cause } )
			const { value: first } = issues.next()
			if( !first ) return new TypeError( message, { cause } )

			const f = this._get_error( first, this._get_value( value, first.path ) )
			const { value: i, done } = issues.next()
			if( done ) return f

			return new AggregateErrorLazy( function*() {
				yield f
				yield self._get_error(i, self._get_value(value, i.path))
				for( const i of issues ) yield self._get_error(i, self._get_value(value, i.path))
			}, message, { cause: { value, schema: this } } )
		}

		/** Type-parser that fails of wrong values. */
		static guard< This extends typeof $mol_schema_any, Value >( this: This, value: Value ): Value & This['default'] {
			const { value: first }  = this.issues_lazy( value ).next()
			return first ? $mol_fail( this._get_error( first, value ) ) : value
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
				if( issues ) Object.defineProperty( i, "issues", {
					get: $mol_memo.func( () => Array.from(issues, issue) )
				} )
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
