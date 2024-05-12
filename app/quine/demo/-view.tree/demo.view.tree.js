	($.$mol_app_quine_demo) = class $mol_app_quine_demo extends ($.$mol_example_large) {
		App(){
			const obj = new this.$.$mol_app_quine();
			return obj;
		}
		sub(){
			return [(this?.App())];
		}
		aspects(){
			return ["Application", "Network/HTTP"];
		}
	};
	($mol_mem(($.$mol_app_quine_demo.prototype), "App"));

//# sourceMappingURL=demo.view.tree.js.map