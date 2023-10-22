namespace $ {

	const str2js = (function (this: $, data: string, url: string) {
		const tree = this.$mol_tree2_from_string(data, url)
		const js = this.$mol_view_tree2_to_js(tree)
		return js
	}).bind($ as typeof $$)

	const js2text = (function (this: $, data: $mol_tree2) {
		const text = this.$mol_tree2_js_to_text(data)
		const src = this.$mol_tree2_text_to_string_mapped_js(text)
		return src
	}).bind($ as typeof $$)

	const make_types = (function (this: $, data: string, url: string) {
		const tree = this.$mol_tree2_from_string(data, url)
		const dts = this.$mol_view_tree2_to_dts(tree)
		const src = this.$mol_tree2_text_to_string_mapped_js(dts)
		return src
	}).bind($ as typeof $$)
	
	export function $mol_view_tree2_to_js_test_id(stack_index = 1, no_prefix = false) {
		const name = new Error('').stack
			?.split('\n').at(stack_index + 1)?.match(/ at (.*) \(/)
			?.[1].toLowerCase().replace(/[ .]/g, '_') ?? ''

		if (no_prefix) return name

		return 'Mvt2tjs_' + name
	}

	export function $mol_view_tree2_to_js_test_run( tree: string ): any {
		class $mol_object3 extends $mol_object {
		}
		const $ = { Object: $mol_object3, $mol_object: $mol_object3, js: '', js_node: undefined as undefined | $mol_tree2 }
		;( $mol_object3 as any )[$mol_ambient_ref] = $

		const name = $mol_view_tree2_to_js_test_id(2, true)

		const path = 'mol/view/tree2/to/js/test/-view.tree/'
		const src_uri = `${name}.test.tree`
		const js_node = str2js( tree, src_uri )
		const js = js2text( js_node )

		const types = make_types(tree, src_uri)

		$mol_view_tree2_to_js_test_saver(path + src_uri, tree.replace(/[\t]{4}/g, '').trim() + '\n')
		$mol_view_tree2_to_js_test_saver(path + src_uri.replace('.tree', '.d.ts'), types)
		$mol_view_tree2_to_js_test_saver(path + src_uri.replace('.tree', '.js'), js)

		eval( js )

		$.js = js
		$.js_node = js_node


		return $
	}
}
