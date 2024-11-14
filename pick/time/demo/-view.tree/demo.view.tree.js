	($.$mol_pick_time_demo) = class $mol_pick_time_demo extends ($.$mol_example_small) {
		moment(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment("T01:23");
			return obj;
		}
		Picker(){
			const obj = new this.$.$mol_pick_time();
			(obj.value_moment) = (next) => ((this.moment(next)));
			return obj;
		}
		sub(){
			return [(this.Picker())];
		}
		tags(){
			return [
				"$mol_time_moment", 
				"timepicker", 
				"time", 
				"datetime"
			];
		}
		aspects(){
			return ["Widget/Control/Button/Picker", "Type/Time"];
		}
	};
	($mol_mem(($.$mol_pick_time_demo.prototype), "moment"));
	($mol_mem(($.$mol_pick_time_demo.prototype), "Picker"));

//# sourceMappingURL=demo.view.tree.js.map