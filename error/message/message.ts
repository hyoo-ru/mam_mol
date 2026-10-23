namespace $ {
	export function $mol_error_message(this: $, error: unknown, fallback = 'Unknown') {
		return String((error instanceof Error ? error.message : null) || error) || fallback
	}
}
