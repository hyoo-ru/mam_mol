namespace $ {
	export function $mol_view_tree2_to_text( this: $, tree: $mol_tree2 ) {
		return this.$mol_tree2_js_to_text( this.$mol_view_tree2_to_js( tree ) )
	}
}
