namespace $ {

	const compile = $mol_data_pipe(
		$mol_tree2_from_string,
		$mol_view_tree2_to_js,
		$mol_tree2_js_to_text,
		$mol_tree2_text_to_string_mapped_js,
	).bind( $ )
	
	export function $mol_view_tree2_to_js_test_run( tree: string ): any {
		const $ = { $mol_object }
		const src = compile( tree )
		eval( src )
		return $
	}
}
