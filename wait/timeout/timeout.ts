namespace $ {
	
	export class $mol_wait_timeout_promise extends $mol_promise<void> {
		readonly task: $mol_after_timeout

		constructor(
			executor?: (
				done: (value: void | PromiseLike<void>) => void,
				fail: (reason?: any) => void
			) => void,
			timeout = 0
		) {
			super(executor)
			this.task = new $mol_after_timeout( timeout , ()=> {
				this.success = true
				this.done()
			})
		}

		success = false

		destructor() {
			this.task.destructor()
		}
	}

	export function $mol_wait_timeout_async( this: $, timeout: number ) {
		return new $mol_wait_timeout_promise(undefined, timeout) as Promise<void>
	}

	export class $mol_wait_timeout_wrap extends $mol_object {
		constructor(readonly timeout: number) {
			super()
		}

		destructor() {
			this.promise?.destructor()
		}

		protected promise: $mol_wait_timeout_promise | null = null

		wait() {
			if (this.promise?.success) return

			this.promise?.destructor()
			this.promise = this.$.$mol_wait_timeout_async(this.timeout) as $mol_wait_timeout_promise

			throw this.promise
		}

		@ $mol_action
		static timeout(timeout: number) {
			return new $mol_wait_timeout_wrap(timeout)
		}

	}

	export function $mol_wait_timeout( this: $, timeout: number ) {
		return this.$mol_wait_timeout_wrap.timeout(timeout).wait()
	}
	
}
