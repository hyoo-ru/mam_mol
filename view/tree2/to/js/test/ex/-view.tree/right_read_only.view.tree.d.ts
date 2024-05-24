declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_right_read_only_foo extends $mol_object {
		a( id: any, next?: any ): any
	}
	
	type $mol_view_tree2_to_js_test_ex_right_read_only_bar_b__77M6P91L = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_read_only_bar['b'] >[0]
		,
		Parameters< ReturnType< $mol_view_tree2_to_js_test_ex_right_read_only_bar['Obj'] >['a'] >[0]
	>
	type $mol_view_tree2_to_js_test_ex_right_read_only_bar_b__SUKF4M29 = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_read_only_bar['b'] >[1]
		,
		Parameters< ReturnType< $mol_view_tree2_to_js_test_ex_right_read_only_bar['Obj'] >['a'] >[1]
	>
	export class $mol_view_tree2_to_js_test_ex_right_read_only_bar extends $mol_object {
		b( id: any, next?: ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_read_only_bar['Obj'] >['a'] > ): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_read_only_bar['Obj'] >['a'] >
		Obj( ): $mol_view_tree2_to_js_test_ex_right_read_only_foo
	}
	
}

//# sourceMappingURL=right_read_only.view.tree.d.ts.map