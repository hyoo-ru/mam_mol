declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_simple_factory_props_bar extends $mol_object {
		sub( ): readonly(number)[]
		loc( ): string
		deep( ): ({ 
			'loc': string,
		}) 
		some( ): boolean
	}
	
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__some__0L1MQV6C = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['some'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__loc__SXFOUS8X = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['loc'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__deep__K5GNA8HX = $mol_type_enforce<
		({ 
			'loc': string,
		}) 
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['deep'] >
	>
	type $mol_view_tree2_to_js_test_ex_simple_factory_props_bar__sub__QLTH9R2L = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_simple_factory_props_bar['sub'] >
	>
	export class $mol_view_tree2_to_js_test_ex_simple_factory_props_foo extends $mol_object {
		button( ): $mol_view_tree2_to_js_test_ex_simple_factory_props_bar
	}
	
}

//# sourceMappingURL=simple_factory_props.view.tree.d.ts.map