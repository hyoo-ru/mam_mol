	($.$mol_time_interval_demo) = class $mol_time_interval_demo extends ($.$mol_example_code) {
		title(){
			return "Time processing library sandbox";
		}
		code(next){
			if(next !== undefined) return next;
			return "const nextYear = new $mol_time_interval( '/P1Y' )\nconst anniversary = nextYear.end.toString( 'YYYY-MM-DD hh:mm' )";
		}
		aspects(){
			return ["Type/Time"];
		}
	};
	($mol_mem(($.$mol_time_interval_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map