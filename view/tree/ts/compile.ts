namespace $ {
	export function $mol_view_tree_ts_compile(tree: $mol_tree) {
		const { node, locales } = $mol_view_tree_ts_module(tree)
		return $mol_view_tree_ts_serialize(node)
	}
}
