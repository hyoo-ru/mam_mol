namespace $ {
	export class $mol_promise<Result = void> extends Promise<Result> {
		done: (value: Result | PromiseLike<Result>) => void
		fail: (reason?: any) => void

		constructor(
			executor?: (
				done: (value: Result | PromiseLike<Result>) => void,
				fail: (reason?: any) => void
			) => void
		) {
			let done: (value: Result | PromiseLike<Result>) => void
			let fail: (reason?: any) => void

			super((d, f) => {
				done = d
				fail = f
				executor?.(d, f)
			})

			this.done = done!
			this.fail = fail!
		}

	}
	
}
