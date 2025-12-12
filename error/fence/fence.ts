namespace $ {
	export function $mol_error_fence<Data>(
		task: () => Data,
		fallback: (parent: Error) => Error | Data | PromiseLike<Data>,
		loading?: () => Data | Error
	) {
		try {
			return task()
		} catch (error) {
			let normalized

			try {
				normalized = $mol_promise_like(error) ? loading?.() : fallback(error as Error)
			} catch (sub_error) {
				$mol_fail_log(sub_error)
			}

			if (normalized === undefined) $mol_fail_hidden(error)
			if (normalized instanceof Error || $mol_promise_like(normalized)) {
				$mol_fail_hidden(normalized)
			}
			$mol_fail_log(error)

			return normalized as Data
		}
	}
}
