	($.$mol_array_lottery_demo) = class $mol_array_lottery_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const rates = [ 1, 2, 3, 4, 5 ]\nconst vote = $mol_array_lottery( rates )";
		}
		aspects(){
			return ["Type/List", "Algorithm/Random"];
		}
	};
	($mol_mem(($.$mol_array_lottery_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map