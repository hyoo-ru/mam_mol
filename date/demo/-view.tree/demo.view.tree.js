	($.$mol_date_demo) = class $mol_date_demo extends ($.$mol_example_small) {
		date_current(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		Current(){
			const obj = new this.$.$mol_date();
			(obj.value_moment) = (next) => ((this?.date_current(next)));
			return obj;
		}
		formatted(){
			return "";
		}
		Formatted(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this?.formatted())]);
			return obj;
		}
		date_empty(next){
			if(next !== undefined) return next;
			return null;
		}
		Empty(){
			const obj = new this.$.$mol_date();
			(obj.value_moment) = (next) => ((this?.date_empty(next)));
			return obj;
		}
		sub(){
			return [
				(this?.Current()), 
				(this?.Formatted()), 
				(this?.Empty())
			];
		}
		tags(){
			return [
				"time", 
				"datepicker", 
				"format"
			];
		}
		aspects(){
			return ["Widget/Control/Button/Picker", "Type/Date"];
		}
	};
	($mol_mem(($.$mol_date_demo.prototype), "date_current"));
	($mol_mem(($.$mol_date_demo.prototype), "Current"));
	($mol_mem(($.$mol_date_demo.prototype), "Formatted"));
	($mol_mem(($.$mol_date_demo.prototype), "date_empty"));
	($mol_mem(($.$mol_date_demo.prototype), "Empty"));

//# sourceMappingURL=demo.view.tree.js.map