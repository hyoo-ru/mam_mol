
namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends new (...args: any) => infer Instance ? Instance : Obj[K]
	}

	export let $mol_one = {} as Instances<$> & (<Instance>(constructor: new (...args: any) => Instance) => Instance)

	const cache = new WeakMap<new (...args: any) => any, {}>()

	function contexted<Instance extends { [$mol_ambient_ref]?: typeof $ }>(
		this: typeof $,
		Factory: new (...args: any) => Instance
	) {
		let instance = cache.get(Factory) as Instance | undefined

		if (instance) return instance

		instance = new Factory()
		instance[$mol_ambient_ref] = this
		cache.set(Factory, instance)

		return instance
	}

	Object.defineProperty($, '$mol_one', {
		get() {
			const t = this

			return new Proxy(contexted, {
				get(self, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function') return val

					const Factory = t.$mol_static[k as keyof typeof t] as new (...args: any) => {}

					return contexted.call(t, Factory)
				}
			})
		}
	})

}
