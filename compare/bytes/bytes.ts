namespace $ {
    export function $mol_compare_bytes(a: Uint8Array, b: Uint8Array): boolean {
		if (a === b) return true
		if (a.length !== b.length) return false

		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i]) return false

		return true
    }
}
