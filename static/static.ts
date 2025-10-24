namespace $ {
	export function $mol_static_create(this: typeof $) {
		const cache = new WeakMap<typeof $mol_object2, typeof $mol_object2>()

		return new Proxy(this as unknown as $, {
			get(t, k) {
				const Factory = t[k as keyof typeof t]
				if (typeof Factory !== 'function' || t === $) return Factory

				let Contexted = cache.get(Factory)
				if (Contexted) return Contexted

				Contexted = $mol_func_name_from(class extends (Factory as typeof $mol_object2) {
					static $ = t
				}, Factory)

				cache.set(Factory, Contexted)

				return Contexted
			},
		})
	}

	export let $mol_static = $mol_static_create.call($)
}
