	($.$mol_data_string_demo) = class $mol_data_string_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Name = $mol_data_string\nconst name = Name( 'Jin' ) // ✅\n\nName( 7 ) // ❌ 7 is not a string";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/String"];
		}
	};
	($mol_mem(($.$mol_data_string_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map