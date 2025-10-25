namespace $ {
	export const caches = new WeakMap<{}, WeakMap<{}, typeof Object>>()
	export let $mol_static = $

	Object.defineProperty($, '$mol_static', {
		get() {
			return new Proxy(this, {
				get(t: typeof $, k) {
					const Factory = t[k as keyof typeof t]
					if (typeof Factory !== 'function' || t === $) return Factory

					let cache = caches.get(t)
					if (! cache) {
						cache = new WeakMap()
						caches.set(t, cache)
					}

					let Contexted = cache.get(Factory)
					if (Contexted) return Contexted

					Contexted = $mol_func_name_from(class extends Factory {
						static $ = t
					}, Factory) as NonNullable<typeof Contexted>

					cache.set(Factory, Contexted)

					return Contexted
				},
			})
		}
	})

}
