	($.$mol_app_questions_demo) = class $mol_app_questions_demo extends ($.$mol_example_large) {
		App(){
			const obj = new this.$.$mol_app_questions();
			return obj;
		}
		title(){
			return "New questions from StackOverflow";
		}
		sub(){
			return [(this?.App())];
		}
		aspects(){
			return [
				"Application", 
				"Network/HTTP", 
				"Integration"
			];
		}
	};
	($mol_mem(($.$mol_app_questions_demo.prototype), "App"));

//# sourceMappingURL=demo.view.tree.js.map