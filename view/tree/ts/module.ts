namespace $ {
	export function $mol_view_tree_ts_module(
		this: $mol_ambient_context,
		tree_module: $mol_tree2,
		locales: $mol_view_tree_ts_locales
	) {
		const classes: $mol_tree2[] = [
			tree_module.data('namespace $ {')
		]

		for (const item of tree_module.kids) {
			if (item.type === '-') {
				classes.push($mol_view_tree_ts_comment(item))
				continue
			}

			const class_node = this.$mol_view_tree_ts_class(item, locales)

			classes.push(class_node)
		}

		classes.push(tree_module.data('}'))

		return tree_module.clone(classes)
	}
}
