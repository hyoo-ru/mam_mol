namespace $ {
	export class $mol_run_lock extends $mol_object {
		protected promise = null as null | Promise<void>

		async lock_async() {
            let next = () => {}
			let destructed = false
            const task = $mol_wire_auto()
			if (! task) return next

			const destructor = task.destructor.bind(task)
            task.destructor = ()=> {
				destructor()
				destructed = true
                next()
            }

			let promise

			do {
				promise = this.promise
				await promise
				if (destructed) return next
			} while (promise !== this.promise)

			this.promise = new Promise(done => { next = done })
			return next
		}

		lock() { return $mol_wire_sync(this).lock_async() }

		run<Result>(cb: () => Result) {
			const unlock = this.lock()
			try {
				const result = cb()
				unlock()
				return result
			} catch(e) {
			   if (! $mol_promise_like(e)) unlock()
			   $mol_fail_hidden(e)
			}
		 }
	}
}
