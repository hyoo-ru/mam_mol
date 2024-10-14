namespace $ {
	export class $mol_run_lock extends $mol_object {
		protected promise = null as null | ReturnType<typeof $mol_promise<null>>

		protected locking = false

		protected async lock_promise() {
			let promise
			this.locking = true

			do {
				promise = this.promise
				await promise
				if (! this.locking) return
			} while (promise !== this.promise)

			this.locking = false

			this.promise = $mol_promise<null>()
			return null
		}

		lock_async() {
			return Object.assign(this.lock_promise(), { destructor: () => {
				if (! this.locking) return this.unlock()
				this.locking = false
			} } )
		}

		lock() { return $mol_wire_sync(this).lock_async() }

		unlock() {
			this.promise?.done(null)
			this.promise = null
		}

		static main = new $mol_run_lock

	}
}
