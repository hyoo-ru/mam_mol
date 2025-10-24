namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends typeof $mol_object2 ? InstanceType<Obj[K]> : never
	}

	export function $mol_single_create(this: typeof $) {
		const cache = new WeakMap<typeof $mol_object2, $mol_object2>()

		return new Proxy(this, {
			get(t, k) {
				const val = t[k as keyof typeof t]
				if (typeof val !== 'function') return val

				const Factory = t.$mol_single[k as keyof typeof t] as typeof $mol_object2

				let instance = cache.get(Factory)
				if (instance) return instance

				instance = new Factory()
				instance.$ = t as unknown as $
				cache.set(Factory, instance)

				return instance
			},
		}) as unknown as Instances<typeof $>
	}

	export let $mol_single = $mol_single_create.call($)

}
