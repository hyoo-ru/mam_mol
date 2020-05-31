namespace $.$$ {

	$mol_test( {
		...generate_tests([
			'simple',
		]),

		'localized'( $ ) {
		},
	} )

	function generate_tests(tests: string[]) {
		const result: Record<string, Function> = {}
		for (const file_part of tests) {
			result[file_part] = async ($: $mol_ambient_context) => {
				const rec = await compile_module($, 'mol/view/tree2/test/sample/' + file_part)
				$mol_assert_equal(rec.sample, rec.content)	
			}
		}

		return result
	}

	async function compile_module($: $mol_ambient_context, file_path: string) {
		const tree_data = await $mol_fiber_async(() => {
			const file = $mol_file.relative(file_path + '.view.tree.ex')
			const data = file.text()
			file.parent().watcher().destructor()

			return data
		})()

		const tree = $mol_tree2.fromString(tree_data)
		const compiled = $.$mol_view_tree2_compile(tree)

		const sample = await $mol_fiber_async(() => {
			const file = $mol_file.relative(file_path + '.view.ts.ex')
			const data = file.text()
			file.parent().watcher().destructor()

			return data
		})()

		return {
			...compiled,
			sample
		}
	}
}
