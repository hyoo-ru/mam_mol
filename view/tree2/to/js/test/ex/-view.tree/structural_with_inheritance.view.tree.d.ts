declare namespace $ {

	export class $mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo extends $mol_object {
		field( ): ({ 
			'xxx': number,
			'xxy': string,
		}) 
	}
	
	export class $mol_view_tree2_to_js_test_ex_structural_with_inheritance_bar extends $mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo {
		field( ): ({ 
			'yyy': number,
			'zzz': number,
		})  & ReturnType< $mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo['field'] >
	}
	
}

//# sourceMappingURL=structural_with_inheritance.view.tree.d.ts.map