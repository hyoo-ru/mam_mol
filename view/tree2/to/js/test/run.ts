namespace $ {

	const str2js_dts = (function (this: $, data: string, url: string) {
		const tree = this.$mol_tree2_from_string(data, url)
		const js_tree = this.$mol_view_tree2_to_js(tree)
		const js_text = this.$mol_tree2_js_to_text(js_tree)
		const js_str = this.$mol_tree2_text_to_string_mapped_js(js_text)
		return js_str
	}).bind($ as typeof $$)

	function $mol_view_tree2_to_js_test_id(stack_index = 1, no_prefix = false) {
		const name = new Error('').stack
			?.split('\n').at(stack_index + 1)?.match(/ at (.*) \(/)
			?.[1].toLowerCase().replace(/[ .]/g, '_') ?? ''

		if (no_prefix) return name

		return '$mol_view_tree2_to_js_test_ex_' + name
	}

	export function $mol_view_tree2_to_js_test_run( tree: string ): any {
		class $mol_view_mock extends $mol_object {}
		const $ = { $mol_view: $mol_view_mock }
		;( $mol_view_mock as any )[$mol_ambient_ref] = $

		const name = $mol_view_tree2_to_js_test_id(2, true)

		const src_uri = `${name}.view.tree`
		const js = str2js_dts( tree, src_uri )

		eval( js )
		return $
	}
}
