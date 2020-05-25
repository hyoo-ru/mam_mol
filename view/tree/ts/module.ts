namespace $ {
	export function $mol_view_tree_ts_module(tree_module: $mol_tree, locales: $mol_view_tree_ts_locales) {
		const classes: $mol_tree[] = [
			tree_module.make_data('namespace $ {')
		]

		for (const item of tree_module.sub) {
			if (item.type === '-') {
				classes.push($mol_view_tree_ts_comment(item))
				continue
			}

			const class_node = $mol_view_tree_ts_class(item, locales)

			classes.push(class_node)
		}

		classes.push(tree_module.make_data('}'))

		return tree_module.make({ sub: classes })
	}
}
