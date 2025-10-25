namespace $ {
	type Instances<Obj> = {
		[K in keyof Obj]: Obj[K] extends typeof $mol_object2 ? InstanceType<Obj[K]> : never
	}

	export let $mol_new = {} as Instances<$>

	Object.defineProperty($, '$mol_new', {
		get() {
			return new Proxy(this, {
				get(t: typeof $, k) {
					const val = t[k as keyof typeof t]
					if (typeof val !== 'function') return val

					const Factory = t.$mol_static[k as keyof typeof t] as typeof $mol_object2

					const instance = new Factory()
					instance[$mol_ambient_ref] = t as $

					return instance
				},
			})
		}
	})

}
