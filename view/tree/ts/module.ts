namespace $ {
	export function $mol_view_tree_ts_module(tree_module: $mol_tree) {
		const locales: Record<string, string> = {}
		const classes: $mol_tree[] = [
			tree_module.make({ data: 'namespace $ {'})
		]

		for (const item of tree_module.sub) {
			if (item.type === '-') {
				classes.push($mol_view_tree_ts_comment(item))
				continue
			}

			const context = new $mol_view_tree_ts_context(item, locales)
			const class_node = $mol_view_tree_ts_class_node(item, context)

			classes.push(class_node)
		}

		classes.push(tree_module.make({ data: '}'}))

		const module = tree_module.make({ sub: classes })

		return { module, locales }
	}
}
