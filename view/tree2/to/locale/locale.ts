namespace $ {
	export function $mol_view_tree2_to_locale(this: $, tree2_module: $mol_tree2) {
		const locales: $mol_view_tree2_locales = {}
		this.$mol_view_tree2_ts_module(tree2_module, locales)
		return locales
	}
}
