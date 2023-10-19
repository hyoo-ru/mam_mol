namespace $ {
	export function $mol_view_tree2_to_js_test_saver_node(path: string, data: string) {
		$mol_file.relative(path).text(data)
	}

	$.$mol_view_tree2_to_js_test_saver = $.$mol_view_tree2_to_js_test_saver_node
}
