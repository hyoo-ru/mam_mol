namespace $ {

	export async function $mol_view_tree2_test(this: $mol_ambient_context, file: string) {
		const tree_data = await $mol_fiber_async(() => $mol_file.relative(file + '.view.tree.ex').text())()
		const tree = $mol_tree2.fromString(tree_data)
		const compiled = this.$mol_view_tree2_compile(tree)

		const sample = await $mol_fiber_async(() => $mol_file.relative(file + '.view.ts.ex').text().trim())()

		return {
			...compiled,
			sample
		}
	}
}
