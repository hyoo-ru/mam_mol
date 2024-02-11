	($.$mol_select_demo_month) = class $mol_select_demo_month extends ($.$mol_example_small) {
		title(){
			return "Month picker with filter";
		}
		sub(){
			return [(this.Month())];
		}
		tags(){
			return ["select", "month"];
		}
		aspects(){
			return ["Widget/Control"];
		}
		month(next){
			if(next !== undefined) return next;
			return "jan";
		}
		months(){
			return {
				"jan": "January", 
				"feb": "February", 
				"mar": "March", 
				"apr": "April", 
				"may": "May", 
				"jun": "June", 
				"jul": "July", 
				"aug": "August", 
				"sep": "September", 
				"oct": "October", 
				"nov": "November", 
				"dec": "December"
			};
		}
		Month(){
			const obj = new this.$.$mol_select();
			(obj.no_options_message) = () => ("Not found");
			(obj.value) = (next) => ((this.month(next)));
			(obj.dictionary) = () => ((this.months()));
			return obj;
		}
	};
	($mol_mem(($.$mol_select_demo_month.prototype), "month"));
	($mol_mem(($.$mol_select_demo_month.prototype), "Month"));

//# sourceMappingURL=month.view.tree.js.map