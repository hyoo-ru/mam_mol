declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar extends $mol_object {
		expanded( ): string
	}
	
	type $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar__expanded__BK5NEG4L = $mol_type_enforce<
		ReturnType< $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo['owner'] >
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar['expanded'] >
	>
	export class $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo extends $mol_object {
		owner( id: any, next?: string ): string
		indexed( id: any, next?: $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar ): $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar
	}
	
}

//# sourceMappingURL=bidi_indexed_second_level.view.tree.d.ts.map