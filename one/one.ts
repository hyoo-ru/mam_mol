
namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends new (...args: any) => any ? InstanceType<Obj[K]> : Obj[K]
	}

	export let $mol_one = {} as Instances<$>

	const cache = new WeakMap<new (...args: any) => any, {}>()

	Object.defineProperty($, '$mol_one', {
		get() {
			return new Proxy(this, {
				get(t: typeof $, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function') return val

					const Factory = t.$mol_static[k as keyof typeof t] as new (...args: any) => {}

					let instance = cache.get(Factory)

					if (instance) return instance

					instance = new Factory()
					;(instance as { [$mol_ambient_ref]: typeof $ } )[$mol_ambient_ref] = t
					cache.set(Factory, instance)

					return instance
				},
			}) as Instances<$>
		}
	})

}
