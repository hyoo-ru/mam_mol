namespace $ {

	function get_cause(cause: unknown): unknown[] {
		if (Array.isArray(cause)) {
			return cause.map(e => e instanceof Error ? get_cause(e) : e).filter(Boolean)
		}

		if (cause instanceof Error) return get_cause(cause.cause)

		return [ cause ].filter(Boolean)
	}

	export class $mol_error_improve_error extends Error {
		name = $$.$mol_func_name( this.constructor ) + '_Error'

		constructor(readonly orig: Error, protected options: ErrorOptions) {
			super(orig.message)
			this.stack = orig.stack
		}

		get cause(): unknown[] {
			return ( [] as unknown[] ).concat(
				... get_cause(this.orig.cause),
				this.options.cause
			)
		}
		
		toJSON() {
			return this.orig.message
		}
	}

	const cache = new WeakMap<Object, Error>()

	export function $mol_error_improve(e: unknown, cause: Object) {
		const err = e instanceof Error ? e : new Error(String(e), { cause: e })

		let improved = cache.get(err)

		if (! improved) {
			improved = new $mol_error_improve_error(err, { cause })
			cache.set(err, improved)
		}

		return improved
	}
}
