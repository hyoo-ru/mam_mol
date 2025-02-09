namespace $ {
	export class $mol_promise<Result = void> extends Promise<Result> {
		done!: (value: Result | PromiseLike<Result>) => void
		fail!: (reason?: any) => void

		constructor(
			executor?: (
				done: (value: Result | PromiseLike<Result>) => void,
				fail: (reason?: any) => void
			) => void
		) {
			super((d, f) => {
				this.done = d
				this.fail = f
				executor?.(d, f)
			})
		}

	}
	
}
