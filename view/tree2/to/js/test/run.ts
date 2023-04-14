namespace $ {

	const compile = $mol_data_pipe(
		$mol_tree2_from_string,
		$mol_view_tree2_to_js,
	).bind( $ )

	const compile2 = $mol_data_pipe(
		$mol_tree2_js_to_text,
		$mol_tree2_text_to_string_mapped_js,
	).bind( $ )

	export function $mol_view_tree2_to_js_test_run( tree: string ): any {
		class $mol_object3 extends $mol_object {
		}
		const $ = { $mol_object: $mol_object3, js: '', js_node: undefined as undefined | $mol_tree2 }
		;( $mol_object3 as any )[$mol_ambient_ref] = $
		const js_node = compile( tree )
		const js = compile2( js_node )
		eval( js )
		$.js = js
		$.js_node = js_node

		return $
	}
}
