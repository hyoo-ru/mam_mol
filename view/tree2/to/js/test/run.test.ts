namespace $ {

	const str2js = (function (this: $, data: string, url: string) {
		const tree = this.$mol_tree2_from_string(data, url)
		const js_tree = this.$mol_view_tree2_to_js(tree)
		const js_text = this.$mol_tree2_js_to_text(js_tree)
		const js_str = this.$mol_tree2_text_to_string_mapped_js(js_text)
		return js_str
	}).bind($ as typeof $$)

	export function $mol_view_tree2_to_js_test_run( tree: string ): any {
		class $mol_view_mock extends $mol_object {}
		const $ = { $mol_object: $mol_view_mock }
		;( $mol_view_mock as any )[$mol_ambient_ref] = $

		const src_uri = `.view.tree`
		const js = str2js( tree, src_uri )

		eval( js )
		return $
	}
}
