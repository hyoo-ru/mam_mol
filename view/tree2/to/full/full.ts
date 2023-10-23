namespace $ {
	export function $mol_view_tree2_to_full(this: $, tree: $mol_tree2) {
		const dts_text = this.$mol_view_tree2_to_dts(tree)
		const dts_str = this.$mol_tree2_text_to_string_mapped_js(dts_text)

		const js_tree = this.$mol_view_tree2_to_js(tree)
		const js_text = this.$mol_tree2_js_to_text(js_tree)
		const js_str = this.$mol_tree2_text_to_string_mapped_js(js_text)

		const locales = this.$mol_view_tree2_to_locale(tree)

		return { js: js_str, dts: dts_str, locales }
	}
}
