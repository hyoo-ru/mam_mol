namespace $ {
	export function $mol_view_tree2_ts_value(
		this: $,
		src: $mol_tree2
	) {
		const converted = this.$mol_view_tree2_value(src)

		if (src.type === 'null') return converted.struct('inline', [
			converted.data(converted.value),
			converted.data(' as any'),
		])

		return converted
	}
}
