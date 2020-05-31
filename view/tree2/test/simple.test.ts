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

	async function compile_module($: $mol_ambient_context, file: string) {
		const tree_data = await $mol_fiber_async(() => {
			console.log('repreprpe')
			return $mol_file.relative(file + '.view.tree.ex').text()
		})()

		const tree = $mol_tree2.fromString(tree_data)
		const compiled = $.$mol_view_tree2_compile(tree)

		const sample = await $mol_fiber_async(() => $mol_file.relative(file + '.view.ts.ex').text().trim())()

		return {
			...compiled,
			sample
		}
	}
}
