namespace $ {
	export function $mol_view_tree2_ts_module(
		this: $mol_ambient_context,
		tree2_module: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		const classes_js: $mol_tree2[] = [
			tree2_module.data('(function($) {')
		]

		const classes_dts: $mol_tree2[] = [
			tree2_module.data('declare namespace $ {')
		]

		let has_data = false

		for (const item of tree2_module.kids) {
			if (item.type === '-') {
				classes_dts.push(this.$mol_view_tree2_ts_comment(item))
				continue
			}

			const class_rec = this.$mol_view_tree2_ts_class(item, locales)

			classes_js.push(class_rec.js)
			classes_dts.push(class_rec.dts)
			has_data = true
		}

		classes_dts.push(tree2_module.data('})($);'), tree2_module.data(''))
		classes_dts.push(tree2_module.data('}'), tree2_module.data(''))

		return {
			dts: tree2_module.list(has_data ? classes_dts : []),
			js: tree2_module.list(has_data ? classes_js : [])
		}
	}
}
