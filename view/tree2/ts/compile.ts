namespace $ {
	export function $mol_view_tree2_ts_compile(this: $, tree2_module: $mol_tree2) {
		const locales: $mol_view_tree2_locales = {}
		const ts_module = this.$mol_view_tree2_ts_module(tree2_module, locales)

		const script = this.$mol_tree2_text_to_string(ts_module)

		return { script, locales }
	}
}
