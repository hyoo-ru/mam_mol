namespace $ {
	export function $mol_error_fence<Data>(
		task: () => Data,
		fallback: (parent: Error) => Error | Data | null | undefined
	) {
		try {
			return task()
		} catch (error) {
			if (! (error instanceof Error) ) $mol_fail_hidden(error)

			try {
				error = fallback(error) ?? error
			} catch (sub_error) {
				$mol_fail_log(sub_error)
			}

			return error instanceof Error ? $mol_fail_hidden(error) : error as Data
		}
	}
}
