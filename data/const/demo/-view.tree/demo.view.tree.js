	($.$mol_data_const_demo) = class $mol_data_const_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const OK = $mol_data_const({ done: true })\nconst ok = OK({ done: true }) // ✅\n\nOK({ done: false }) // ❌ {\"done\":false} is not {\"done\":true}";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"equals"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_const_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map