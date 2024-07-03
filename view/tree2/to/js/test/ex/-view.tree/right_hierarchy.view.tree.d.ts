declare namespace $ {

	type $mol_view_tree2_to_js_test_ex_right_hierarchy_foo_indexed_title__V2DIQIFU = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['indexed_title'] >[0]
		,
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['Indexed'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_hierarchy_foo_indexed_title__3UT1J2AA = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['indexed_title'] >[1]
		,
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['Indexed'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_hierarchy_foo_prj_domain__7C8K8FP9 = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_domain'] >[0]
		,
		Parameters< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj'] >['domain'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_hierarchy_foo_prj_user__UDJAUGIV = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_user'] >[0]
		,
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_domain'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_hierarchy_foo_prj_user_id__3RYIIZUE = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_user_id'] >[0]
		,
		Parameters< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_user'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_hierarchy_bar__id__4UQHSI5P = $mol_type_enforce<
		ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['indexed_id'] >
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_bar['id'] >
	>
	export class $mol_view_tree2_to_js_test_ex_right_hierarchy_foo extends $mol_object {
		indexed_title( id: any, next?: ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['Indexed'] >['title'] > ): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['Indexed'] >['title'] >
		indexed_id( id: any): number
		prj_domain( id: any): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj'] >['domain'] >
		prj_user( id: any): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_domain'] >['user'] >
		prj_user_id( id: any): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_hierarchy_foo['prj_user'] >['id'] >
		Indexed( id: any): $mol_view_tree2_to_js_test_ex_right_hierarchy_bar
		prj( ): $mol_view_tree2_to_js_test_ex_right_hierarchy_bar
	}
	
}

//# sourceMappingURL=right_hierarchy.view.tree.d.ts.map