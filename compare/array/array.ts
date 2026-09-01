namespace $ {
    export function $mol_compare_array<Value extends ArrayLike<unknown>>(a: Value, b: Value): boolean {
		if (a === b) return true
		if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false
		if (a.length !== b.length) return false

		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i]) return false

		return true
	}
}
