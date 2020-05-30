namespace $ {
	export function $mol_view_tree2_compile(this: $mol_ambient_context, tree2_module: $mol_tree2) {
		const locales: $mol_view_tree2_locales = {}
		const ts_module = this.$mol_view_tree2_module(tree2_module, locales)

		const content = this.$mol_view_tree2_serialize(ts_module)

		return { content, locales }
	}
}
