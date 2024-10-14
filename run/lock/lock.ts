namespace $ {
	// class $mol_run_lock_atom extends $mol_object {
	// 	locking = false
	// 	unlock() {}
	// 	override destructor() {
	// 		if (! this.locking) return this.unlock()
	// 		this.locking = false
	// 	}
	// }

	export class $mol_run_lock extends $mol_object {
		protected promise = null as null | ReturnType<typeof $mol_promise<null>>

		protected async lock_promise(obj: { locking: boolean }) {
			let promise

			do {
				promise = this.promise
				await promise
				if (! obj.locking) return
			} while (promise !== this.promise)

			obj.locking = false

			this.promise = $mol_promise<null>()
			return null
		}

		lock_async() {
			const obj = {
				locking: true,
				destructor: () => {
					if (! obj.locking) return this.unlock()
					obj.locking = false
				}
			}

			return Object.assign(this.lock_promise(obj),  obj)
		}

		lock() { return $mol_wire_sync(this).lock_async() }

		unlock() {
			this.promise?.done(null)
			this.promise = null
		}

		static main = new $mol_run_lock

	}
}
