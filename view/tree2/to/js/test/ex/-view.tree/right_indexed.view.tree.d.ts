declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_right_indexed_foo extends $mol_object {
		a( next?: ({ 
			'some': number,
		})  ): ({ 
			'some': number,
		}) 
	}
	
	type $mol_view_tree2_to_js_test_ex_right_indexed_bar_b__57ZO09ND = $mol_type_enforce<
		Parameters< $mol_view_tree2_to_js_test_ex_right_indexed_bar['b'] >[0]
		,
		Parameters< $mol_view_tree2_to_js_test_ex_right_indexed_bar['Cls'] >[0]
	>
	export class $mol_view_tree2_to_js_test_ex_right_indexed_bar extends $mol_object {
		Cls( id: any): $mol_view_tree2_to_js_test_ex_right_indexed_foo
		b( id: any): ReturnType< ReturnType< $mol_view_tree2_to_js_test_ex_right_indexed_bar['Cls'] >['a'] >
	}
	
}

//# sourceMappingURL=right_indexed.view.tree.d.ts.map