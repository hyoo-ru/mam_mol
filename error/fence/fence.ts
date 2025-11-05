namespace $ {
	export function $mol_error_fence<Data>(
		cb: () => Data,
		catcher: (parent: Error) => Error | null | undefined
	) {
		try {
			return cb()
		} catch (e) {
			if (! (e instanceof Error) ) $mol_fail_hidden(e)

			try {
				e = catcher(e) ?? e
			} catch (e2) {
				$mol_fail_log(e2)
			}

			$mol_fail_hidden(e)
		}
	}
}
