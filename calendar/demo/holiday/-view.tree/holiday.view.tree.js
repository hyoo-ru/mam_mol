	($.$mol_calendar_demo_holiday) = class $mol_calendar_demo_holiday extends ($.$mol_example_small) {
		month(){
			return "2018-01";
		}
		holiday(id){
			return false;
		}
		Calendar(){
			const obj = new this.$.$mol_calendar();
			(obj.month_string) = () => ((this?.month()));
			(obj.day_holiday) = (id) => ((this?.holiday(id)));
			return obj;
		}
		title(){
			return "Days of month 2018-01 with custom holidays";
		}
		holidays(){
			return [
				"2018-01-01", 
				"2018-01-02", 
				"2018-01-03", 
				"2018-01-04", 
				"2018-01-05", 
				"2018-01-06", 
				"2018-01-07", 
				"2018-01-08", 
				"2018-01-13", 
				"2018-01-14", 
				"2018-01-20", 
				"2018-01-21", 
				"2018-01-27", 
				"2018-01-28"
			];
		}
		sub(){
			return [(this?.Calendar())];
		}
		tags(){
			return ["month"];
		}
		aspects(){
			return ["Widget/Grid", "Type/Date"];
		}
	};
	($mol_mem(($.$mol_calendar_demo_holiday.prototype), "Calendar"));

//# sourceMappingURL=holiday.view.tree.js.map