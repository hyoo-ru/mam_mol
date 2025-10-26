namespace $ {

	type Constructor = new (...args: any) => any

	export let $mol_static = $ as typeof $ & (<Value extends Constructor>(constructor: Value) => Value)

	export const caches = new WeakMap<typeof $, WeakMap<Constructor, Constructor>>()

	function contexted<Value extends Constructor>(
		t: typeof $,
		Factory: Value
	): Value {
		let cache = caches.get(t)
		if (! cache) {
			cache = new WeakMap()
			caches.set(t, cache)
		}

		let Contexted = cache.get(Factory) as Value | undefined
		if (Contexted) return Contexted

		Contexted = $mol_func_name_from(class extends Factory {
			static $ = t
		}, Factory) as NonNullable<typeof Contexted>

		cache.set(Factory, Contexted)

		return Contexted
	}

	Object.defineProperty($, '$mol_static', {
		get() {
			return new Proxy(this, {
				get(t: typeof $, k) {
					const Factory = t[k as keyof typeof t]
					if (typeof Factory !== 'function' || t === $) return Factory
					return contexted(t, Factory)
				},

				apply(t: typeof $, self, args) {
					if (args.length !== 1 || typeof args[0] !== 'function') return self.call(t, ...args)
					return contexted(t, args[0])
				}
			})
		}
	})

}
