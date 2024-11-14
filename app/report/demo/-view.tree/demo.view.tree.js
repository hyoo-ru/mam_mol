	($.$mol_app_report_demo) = class $mol_app_report_demo extends ($.$mol_example_large) {
		App(){
			const obj = new this.$.$mol_app_report();
			return obj;
		}
		sub(){
			return [(this.App())];
		}
		aspects(){
			return ["Widget/Form"];
		}
	};
	($mol_mem(($.$mol_app_report_demo.prototype), "App"));

//# sourceMappingURL=demo.view.tree.js.map