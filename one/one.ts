
namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends new (...args: any) => infer Instance ? Instance : Obj[K]
	}

	export let $mol_one = {} as Instances<$> & (<Instance>(constructor: new (...args: any) => Instance) => Instance)

	const cache = new WeakMap<new (...args: any) => any, {}>()

	function contexted<Instance extends { [$mol_ambient_ref]?: typeof $ }>(
		this: typeof $,
		Origin: new (...args: any) => Instance
	) {
		const Contexted = this.$mol_static(Origin)
		let instance = cache.get(Contexted) as Instance | undefined

		if (instance) return instance

		instance = new Contexted()
		instance[$mol_ambient_ref] = this
		cache.set(Contexted, instance)

		return instance
	}

	Object.defineProperty($, '$mol_one', {
		get() {
			const t = this

			return new Proxy(contexted, {
				get(self, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function') return val
					return contexted.call(t, val)
				}
			})
		}
	})

}
