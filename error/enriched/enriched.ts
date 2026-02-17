namespace $ {
	export function $mol_error_enriched<V>(cause: {}, cb: () => V) {
		return $mol_error_fence(
			cb,
			e => new $mol_error_mix(e.message, cause, e),
		)
	}
}
