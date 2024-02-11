	($.$mol_calendar_demo_simple) = class $mol_calendar_demo_simple extends ($.$mol_example_small) {
		title(){
			return "Days of curret month";
		}
		sub(){
			return [(this.Calendar())];
		}
		tags(){
			return ["month"];
		}
		aspects(){
			return ["Widget/Grid", "Type/Date"];
		}
		today(){
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		Calendar(){
			const obj = new this.$.$mol_calendar();
			(obj.month_moment) = () => ((this.today()));
			return obj;
		}
	};
	($mol_mem(($.$mol_calendar_demo_simple.prototype), "today"));
	($mol_mem(($.$mol_calendar_demo_simple.prototype), "Calendar"));

//# sourceMappingURL=simple.view.tree.js.map