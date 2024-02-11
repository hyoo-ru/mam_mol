	($.$mol_app_hello_demo) = class $mol_app_hello_demo extends ($.$mol_example_large) {
		title(){
			return "Simpliest application";
		}
		sub(){
			return [(this.App())];
		}
		aspects(){
			return ["Application"];
		}
		App(){
			const obj = new this.$.$mol_app_hello();
			return obj;
		}
	};
	($mol_mem(($.$mol_app_hello_demo.prototype), "App"));

//# sourceMappingURL=demo.view.tree.js.map