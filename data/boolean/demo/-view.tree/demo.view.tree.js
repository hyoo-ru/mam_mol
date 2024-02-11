	($.$mol_data_boolean_demo) = class $mol_data_boolean_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const IsAdult = $mol_data_boolean\nconst isAdult = IsAdult( false ) // ✅\n\nIsAdult( 0 ) // ❌ 0 is not a boolean";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Boolean"];
		}
	};
	($mol_mem(($.$mol_data_boolean_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map