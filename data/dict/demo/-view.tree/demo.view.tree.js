	($.$mol_data_dict_demo) = class $mol_data_dict_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Names = $mol_data_dict( $mol_data_string )\nconst names = Names({ jin: 'Jin', john: 'John' }) // ✅\n\nNames({ jin: 'Jin', john: 5 }) // ❌ [\"john\"] 5 is not a string";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Dictionary"];
		}
	};
	($mol_mem(($.$mol_data_dict_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map