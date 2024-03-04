declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_left_second_level_index_bar extends $mol_object {
		localized( ): string
	}
	
	type $mol_view_tree2_to_js_test_ex_left_second_level_index_bar__localized__D4HBY9P7 = $mol_type_enforce<
		ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_foo['some'] >
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_bar['localized'] >
	>
	export class $mol_view_tree2_to_js_test_ex_left_second_level_index_foo extends $mol_object {
		some( id: any, next?: string ): string
		owner( id: any, next?: $mol_view_tree2_to_js_test_ex_left_second_level_index_bar ): $mol_view_tree2_to_js_test_ex_left_second_level_index_bar
		cls( id: any): ReturnType< $mol_view_tree2_to_js_test_ex_left_second_level_index_foo['owner'] >
	}
	
}

//# sourceMappingURL=left_second_level_index.view.tree.d.ts.map