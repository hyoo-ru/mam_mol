
namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends typeof $mol_object2 ? InstanceType<Obj[K]> : never
	}

	export let $mol_one = {} as Instances<$>

	const cache = new WeakMap<typeof $mol_object2, $mol_object2>()

	Object.defineProperty($, '$mol_one', {
		get() {
			return new Proxy(this, {
				get(t: typeof $, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function') return val

					const Factory = t.$mol_static[k as keyof typeof t] as typeof $mol_object2

					let instance = cache.get(Factory)

					if (instance) return instance

					instance = new Factory()
					instance[$mol_ambient_ref] = t as $
					cache.set(Factory, instance)

					return instance
				},
			}) as Instances<$>
		}
	})

}
