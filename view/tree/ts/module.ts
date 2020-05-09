namespace $ {
	export function $mol_view_tree_ts_module(tree_module: $mol_tree) {
		return tree_module.make({ type: 'root', sub: [
			tree_module.make({ data: 'namespace $ {'}),
			...tree_module.sub.map(node => node.type === '-'
				? $mol_view_tree_ts_comment(node)
				: $mol_view_tree_ts_class_node(node)
			),
			tree_module.make({ data: '}'}),
		] })
	}
}
