namespace $ {
	export function $mol_view_tree2_ts_module(
		this: $,
		tree2_module: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		tree2_module = $mol_view_tree2_classes(tree2_module)
		
		const classes: $mol_tree2[] = [
			tree2_module.data('namespace $ {')
		]

		let has_data = false

		for (const item of tree2_module.kids) {

			const class_node = this.$mol_view_tree2_ts_class(item, locales)

			classes.push(class_node)
			has_data = true
		}

		classes.push(tree2_module.data('}'), tree2_module.data(''))

		return tree2_module.list(has_data ? classes : [])
	}
}
