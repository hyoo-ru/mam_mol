	($.$mol_data_pattern_demo) = class $mol_data_pattern_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Birthday = $mol_data_pattern( /^\\d{4}-\\d{2}-\\d{2}$/ )\nconst birthday = Birthday( '2023-01-06' ) // ✅\n\nBirthday( '2023-1-6' ) // ❌ 2023-01-06 is not a /^\\d{4}-\\d{2}-\\d{2}$/";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"pattern"
			];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/String"];
		}
	};
	($mol_mem(($.$mol_data_pattern_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map