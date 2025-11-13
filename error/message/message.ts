namespace $ {
	export function $mol_error_message(this: $, error: unknown) {
		return String((error instanceof Error ? error.message : null) || error) || 'Unknown'
	}
}
