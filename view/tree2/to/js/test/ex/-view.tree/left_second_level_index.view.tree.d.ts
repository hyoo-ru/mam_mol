declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_left_second_level_index_bar extends $mol_object {
		localized( ): string
	}
	
	type $mol_view_tree2_to_js_test_ex_left_second_level_index_bar__localized__2VV4C9WF = $mol_type_enforce<
		ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_foo['some'] >
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_bar['localized'] >
	>
	export class $mol_view_tree2_to_js_test_ex_left_second_level_index_foo extends $mol_object {
		cls( id: any): ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_foo['owner'] >
		some( id: any, next?: string ): string
		owner( id: any, next?: $mol_view_tree2_to_js_test_ex_left_second_level_index_bar ): $mol_view_tree2_to_js_test_ex_left_second_level_index_bar
	}
	
}

//# sourceMappingURL=left_second_level_index.view.tree.d.ts.map