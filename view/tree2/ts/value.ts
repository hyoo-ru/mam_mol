namespace $ {
	export function $mol_view_tree2_ts_value(
		this: $mol_ambient_context,
		src: $mol_tree2
	): $mol_view_tree2_ts_method_body_type {
		const dtype = this.$mol_view_tree2_value_type(src)
		const code = this.$mol_view_tree2_value(src, dtype)
		const result_type = src.data(dtype === 'null' ? 'any' : dtype)

		return { code, result_type }
	}
}
