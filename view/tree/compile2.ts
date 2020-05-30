namespace $ {
	export function $mol_view_tree_compile2(this: $mol_ambient_context, tree_module: $mol_tree2) {
		const locales: $mol_view_tree_ts_locales = {}
		const ts_module = this.$mol_view_tree_ts_module(tree_module, locales)

		const content = this.$mol_view_tree_serialize(ts_module)

		return { content, locales }
	}
}
