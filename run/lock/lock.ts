namespace $ {
	export class $mol_run_lock extends $mol_object {
		protected promise = null as null | Promise<void>

		async lock_async() {
            let next = null as null | (() => void)
			let destructed = false
            const task = $mol_wire_auto()
			if (! task) return null

			const destructor = task.destructor.bind(task)
            task.destructor = ()=> {
				destructor()
                next?.()
				destructed = true
            }

			let promise

			do {
				promise = this.promise
				await promise
			} while (promise !== this.promise)

            if (destructed) return null

			this.promise = new Promise(done => { next = done })
			return next
		}

		lock() { return $mol_wire_sync(this).lock_async() }

	}
}
