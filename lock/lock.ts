namespace $ {
	export class $mol_lock extends $mol_object {
		protected promise = null as null | Promise<void>

		async wait() {
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

		grab() { return $mol_wire_sync(this).wait() }
	}
}
