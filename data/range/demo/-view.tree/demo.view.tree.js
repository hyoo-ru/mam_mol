	($.$mol_data_range_demo) = class $mol_data_range_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Portion = $mol_data_range( 0, 1 )\nconst portion = Portion( 0.5 ) // ✅\n\nPortion( 0 ) // ❌ 0 is out range (0,1)";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"range"
			];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Number"];
		}
	};
	($mol_mem(($.$mol_data_range_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map