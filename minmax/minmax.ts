namespace $ {
	export function $mol_minmax(value: number, min: number, max: number): number {
		if (value < min) return min
		if (value > max) return max
		return value
	}
}
