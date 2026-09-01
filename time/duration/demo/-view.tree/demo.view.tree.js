	($.$mol_time_duration_demo) = class $mol_time_duration_demo extends ($.$mol_example_code) {
		title(){
			return "Time processing library sandbox";
		}
		code(next){
			if(next !== undefined) return next;
			return "const week = new $mol_time_duration( 'P7D' )\nconst days = week.count( 'P1D' )";
		}
		aspects(){
			return ["Type/Time"];
		}
	};
	($mol_mem(($.$mol_time_duration_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map