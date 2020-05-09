namespace $ {
	export function $mol_view_tree_ts_compile(tree: $mol_tree) {
		return $mol_view_tree_ts_serialize($mol_view_tree_ts_module(tree))
	}
}
