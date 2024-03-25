declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar extends $mol_object {
		rows( ): readonly(any)[]
	}
	
	type $mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar__rows__0HKQBL4R = $mol_type_enforce<
		ReturnType< $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo['content'] >
		,
		ReturnType< $mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar['rows'] >
	>
	export class $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo extends $mol_object {
		content( ): readonly(any)[]
		Obj( ): $mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar
		obj( ): ({ 
			'prop': ReturnType< $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo['Obj'] >,
		}) 
		arr( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=left_in_array_and_object.view.tree.d.ts.map