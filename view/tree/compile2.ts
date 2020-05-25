namespace $ {
	export function $mol_view_tree_compile2(tree_module: $mol_tree) {
		const locales: $mol_view_tree_ts_locales = {}
		const ts_module = $mol_view_tree_ts_module(tree_module, locales)

		const content = $mol_view_tree_serialize(ts_module)

		return { content, locales }
	}
}
