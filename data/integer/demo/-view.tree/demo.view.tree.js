	($.$mol_data_integer_demo) = class $mol_data_integer_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Age = $mol_data_integer\nconst age = Age( 18 ) // ✅\n\nAge( 18.5 ) // ❌ 18.5 is not an integer";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Number/Integer"];
		}
	};
	($mol_mem(($.$mol_data_integer_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map