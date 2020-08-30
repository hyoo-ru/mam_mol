namespace $ {
	export function $mol_view_tree2_ts_value(
		this: $mol_ambient_context,
		src: $mol_tree2
	) {
		const converted = this.$mol_view_tree2_value(src)

		if (src.type === 'null') return $mol_tree2.struct('inline', [
			converted.data(converted.value),
			converted.data(' as any'),
		])

		return converted
	}
}
