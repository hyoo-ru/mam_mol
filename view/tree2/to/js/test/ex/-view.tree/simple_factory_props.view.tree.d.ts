declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_simple_factory_props_bar extends $mol_object {
		sub( ): readonly(number)[]
		loc( ): string
		deep( ): ({ 
			'loc': string,
		}) 
		some( ): boolean
	}
	
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__some_mol_view_tree2_to_js_test_ex_simple_factory_props_foo_1 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['some'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__loc_mol_view_tree2_to_js_test_ex_simple_factory_props_foo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['loc'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__deep_mol_view_tree2_to_js_test_ex_simple_factory_props_foo_3 = $mol_type_enforce<
		({ 
			'loc': string,
		}) 
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['deep'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__sub_mol_view_tree2_to_js_test_ex_simple_factory_props_foo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['sub'] >
	>
	export class $mol_view_tree2_to_js_test_ex_simple_factory_props_foo extends $mol_object {
		button( ): $mol_view_tree2_to_js_test_ex_simple_factory_props_bar
	}
	
}

//# sourceMappingURL=simple_factory_props.view.tree.d.ts.map