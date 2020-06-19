namespace $.$$ {

	$mol_test( {
		async 'localized - simple'( $ ) {
			const rec = await compile_module($, 'mol/view/tree2/ts/test/sample/simple' )

			$mol_assert_equal(rec.locales['$mol_view_tree2_ts_test_sample_simple_localized'], 'localized value')
		},

		async 'localized - factory'( $ ) {
			const rec = await compile_module($, 'mol/view/tree2/ts/test/sample/factory' )

			$mol_assert_equal(rec.locales['$mol_view_tree2_ts_test_sample_factory_Simple_localized'], 'localized value')
		},

		...generate_tests([
			'empty',
			'simple',
			'factory',
			'array',
			'dictionary',
			'multiple_class',
			'bind/left',
			'bind/right',
			'bind/both',
		]),
	} )

	function generate_tests(tests: string[]) {
		const result: Record<string, Function> = {}
		for (const file_part of tests) {
			result[file_part] = async ($: $mol_ambient_context) => {
				const rec = await compile_module($, 'mol/view/tree2/ts/test/sample/' + file_part)
				$mol_assert_equal(rec.sample, rec.script)	
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

		const tree = $mol_tree2.fromString(tree_data, new $mol_span(file_path + '.view.tree.ex', 0, 0, tree_data.length))
		const compiled = $.$mol_view_tree2_ts_compile(tree)

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
