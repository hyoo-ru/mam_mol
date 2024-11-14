	($.$mol_calendar_demo_selection) = class $mol_calendar_demo_selection extends ($.$mol_example_small) {
		month(){
			return "2018-01";
		}
		selected(id){
			return false;
		}
		Calendar(){
			const obj = new this.$.$mol_calendar();
			(obj.month_string) = () => ((this.month()));
			(obj.day_selected) = (id) => ((this.selected(id)));
			return obj;
		}
		title(){
			return "Days of month 2018-01 with custom selection";
		}
		interval_config(){
			return {"start": "2018-01-05", "end": "2018-01-10"};
		}
		days(){
			return [
				"2018-01-18", 
				"2018-01-20", 
				"2018-01-26", 
				"2018-02-01", 
				"2018-02-03"
			];
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
	};
	($mol_mem(($.$mol_calendar_demo_selection.prototype), "Calendar"));

//# sourceMappingURL=selection.view.tree.js.map