namespace $ {

	type Constructor = new (...args: any) => any

	export const factory_caches = new WeakMap<typeof $, WeakMap<Constructor, Constructor>>()

	function contexted<Value extends Constructor>(
		this: typeof $,
		Factory: Value
	): Value {
		let cache = factory_caches.get(this)
		if (! cache) {
			cache = new WeakMap()
			factory_caches.set(this, cache)
		}

		let Contexted = cache.get(Factory) as Value | undefined
		if (Contexted) return Contexted

		const t = this

		Contexted = $mol_func_name_from(class extends Factory {
			static $ = t
		}, Factory) as NonNullable<typeof Contexted>

		cache.set(Factory, Contexted)

		return Contexted
	}

	export let $mol_static = contexted as typeof $ & (<Value extends Constructor>(constructor: Value) => Value)

	Object.defineProperty($, '$mol_static', {
		get() {
			const t = this

			return new Proxy(contexted as typeof $mol_static, {
				get(self, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function' || t === $) return val
					return contexted.call(t, val)
				},
			})
		}
	})

}
