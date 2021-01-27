namespace $ {
	export function $mol_view_tree2_to_text(this: $, tree2_module: $mol_tree2) {
		const locales: $mol_view_tree2_locales = {}
		const ts_module = this.$mol_view_tree2_ts_module(tree2_module, locales)
		return ts_module
	}
}
