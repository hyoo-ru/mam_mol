	($.$mol_time_moment_demo) = class $mol_time_moment_demo extends ($.$mol_example_code) {
		title(){
			return "Time processing library sandbox";
		}
		code(next){
			if(next !== undefined) return next;
			return "const now = new $mol_time_moment\nconst today = now.toString( 'YYYY-MM-DD' )\nconst tomorrow = now.shift( 'P1D' ).toString( 'DD Mon' )";
		}
		aspects(){
			return ["Type/Time"];
		}
	};
	($mol_mem(($.$mol_time_moment_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map