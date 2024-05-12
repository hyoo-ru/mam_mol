	($.$mol_filler_demo) = class $mol_filler_demo extends ($.$mol_example_small) {
		Filler(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (6000);
			return obj;
		}
		title(){
			return "Prints large bulk of text";
		}
		sub(){
			return [(this?.Filler())];
		}
		tags(){
			return [
				"filler", 
				"fake", 
				"lorem", 
				"ipsum", 
				"dolor"
			];
		}
		aspects(){
			return ["Widget/Text"];
		}
	};
	($mol_mem(($.$mol_filler_demo.prototype), "Filler"));

//# sourceMappingURL=demo.view.tree.js.map