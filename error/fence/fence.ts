namespace $ {
	function pass<Data>(data: Data) {
		return data
	}

	export function $mol_error_fence<Data>(
		task: () => Data,
		fallback: (parent: Error) => Error | Data | PromiseLike<Data>,
		loading: (parent: PromiseLike<Data>) => Error | Data | PromiseLike<Data> = pass
	) {
		try {
			return task()
		} catch (error) {
			let normalized

			try {
				normalized = $mol_promise_like(error) ? loading(error) : fallback(error as Error)
			} catch (sub_error) {
				normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(
					(sub_error as Error).message,
					{ error },
					sub_error as Error,
				)
			}

			if (normalized instanceof Error || $mol_promise_like(normalized)) {
				$mol_fail_hidden(normalized)
			}

			return normalized as Data
		}
	}
}
