namespace $ {
	export function $mol_view_tree2_ts_module(
		this: $mol_ambient_context,
		tree2_module: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		const classes: $mol_tree2[] = [
			tree2_module.data('namespace $ {')
		]

		let has_data = false

		for (const item of tree2_module.kids) {
			if (item.type === '-') {
				classes.push(this.$mol_view_tree2_ts_comment(item))
				continue
			}

			const class_node = this.$mol_view_tree2_ts_class(item, locales)

			classes.push(class_node)
			has_data = true
		}

		classes.push(tree2_module.data('}'), tree2_module.data(''))

		return tree2_module.list(has_data ? classes : [])
	}
}
