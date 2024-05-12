	($.$mol_number_demo) = class $mol_number_demo extends ($.$mol_example_small) {
		value_string(){
			return "";
		}
		Value_string(){
			const obj = new this.$.$mol_string();
			(obj.value) = () => ((this?.value_string()));
			(obj.disabled) = () => (true);
			return obj;
		}
		reset_enabled(){
			return true;
		}
		reset_value(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("Reset");
			(obj.enabled) = (next) => ((this?.reset_enabled()));
			(obj.click) = (next) => ((this?.reset_value(next)));
			return obj;
		}
		Section_value_bar(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this?.Value_string()), (this?.Reset())]);
			return obj;
		}
		Section_value_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Section_value_bar())]);
			return obj;
		}
		Section_value(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Stringified number value");
			(obj.content) = () => ([(this?.Section_value_row())]);
			return obj;
		}
		Initial_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			return obj;
		}
		Initial_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Initial");
			(obj.content) = () => ([(this?.Initial_number())]);
			return obj;
		}
		Hint_number(){
			const obj = new this.$.$mol_number();
			(obj.hint) = () => ("Any number");
			(obj.value) = (next) => ((this?.value(next)));
			return obj;
		}
		Hint_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Hint showed (if empty value)");
			(obj.content) = () => ([(this?.Hint_number())]);
			return obj;
		}
		Section_initial_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Initial_number_label()), (this?.Hint_number_label())]);
			return obj;
		}
		Section_initial(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Simple");
			(obj.content) = () => ([(this?.Section_initial_row())]);
			return obj;
		}
		Value_field_disabled_number(){
			const obj = new this.$.$mol_number();
			(obj.hint) = () => ("This hint not showed while string_enabled is false");
			(obj.value) = (next) => ((this?.value(next)));
			(obj.string_enabled) = () => (false);
			return obj;
		}
		Value_field_disabled_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Value field disabled");
			(obj.content) = () => ([(this?.Value_field_disabled_number())]);
			return obj;
		}
		Disabled_number(){
			const obj = new this.$.$mol_number();
			(obj.hint) = () => ("This hint not showed while enabled is false");
			(obj.value) = (next) => ((this?.value()));
			(obj.enabled) = () => (false);
			return obj;
		}
		Disabled_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Disabled");
			(obj.content) = () => ([(this?.Disabled_number())]);
			return obj;
		}
		Dec_disabled_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.dec_enabled) = () => (false);
			return obj;
		}
		Dec_disabled_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Decrement disabled");
			(obj.content) = () => ([(this?.Dec_disabled_number())]);
			return obj;
		}
		Inc_disabled_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.inc_enabled) = () => (false);
			return obj;
		}
		Inc_disabled_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Increment disabled");
			(obj.content) = () => ([(this?.Inc_disabled_number())]);
			return obj;
		}
		Section_disabled_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Value_field_disabled_number_label()), 
				(this?.Disabled_number_label()), 
				(this?.Dec_disabled_number_label()), 
				(this?.Inc_disabled_number_label())
			]);
			return obj;
		}
		Section_disabled(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Disabled");
			(obj.content) = () => ([(this?.Section_disabled_row())]);
			return obj;
		}
		Precision_change_10_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision_change) = () => (10);
			return obj;
		}
		Precision_change_10_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision change 10");
			(obj.content) = () => ([(this?.Precision_change_10_number())]);
			return obj;
		}
		Precision_change_01_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision_change) = () => (0.1);
			return obj;
		}
		Precision_change_01_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("⚠️ Precision change 0.1");
			(obj.content) = () => ([(this?.Precision_change_01_number())]);
			return obj;
		}
		Precision_100_number_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision) = () => (100);
			return obj;
		}
		Precision_100_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision 100");
			(obj.content) = () => ([(this?.Precision_100_number_number())]);
			return obj;
		}
		Precision_5_number_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision) = () => (5);
			return obj;
		}
		Precision_5_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision 5");
			(obj.content) = () => ([(this?.Precision_5_number_number())]);
			return obj;
		}
		Precision_01_number_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision) = () => (0.1);
			return obj;
		}
		Precision_01_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision 0.1");
			(obj.content) = () => ([(this?.Precision_01_number_number())]);
			return obj;
		}
		Precision_005_number_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision) = () => (0.05);
			return obj;
		}
		Precision_005_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision 0.05");
			(obj.content) = () => ([(this?.Precision_005_number_number())]);
			return obj;
		}
		Precision_view_001_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision_view) = () => (0.001);
			return obj;
		}
		Precision_view_001_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Precision view 0.001");
			(obj.content) = () => ([(this?.Precision_view_001_number())]);
			return obj;
		}
		Precision_view_10_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.precision_view) = () => (10);
			return obj;
		}
		Precision_view_10_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("⚠️ Precision view 10");
			(obj.content) = () => ([(this?.Precision_view_10_number())]);
			return obj;
		}
		Section_precision_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Precision_change_10_number_label()), 
				(this?.Precision_change_01_number_label()), 
				(this?.Precision_100_number_label()), 
				(this?.Precision_5_number_label()), 
				(this?.Precision_01_number_label()), 
				(this?.Precision_005_number_label()), 
				(this?.Precision_view_001_number_label()), 
				(this?.Precision_view_10_number_label())
			]);
			return obj;
		}
		Section_precision(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Precision");
			(obj.content) = () => ([(this?.Section_precision_row())]);
			return obj;
		}
		value_min_m5(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Min_m5_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_min_m5(next)));
			(obj.value_min) = () => (-5);
			return obj;
		}
		Min_m5_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Min value -5");
			(obj.content) = () => ([(this?.Min_m5_number())]);
			return obj;
		}
		value_min_0(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Min_0_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_min_0(next)));
			(obj.value_min) = () => (0);
			return obj;
		}
		Min_0_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Min value 0");
			(obj.content) = () => ([(this?.Min_0_number())]);
			return obj;
		}
		value_min_5(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Min_5_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_min_5(next)));
			(obj.value_min) = () => (5);
			return obj;
		}
		Min_5_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Min value 5");
			(obj.content) = () => ([(this?.Min_5_number())]);
			return obj;
		}
		value_max_m5(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Max_m5_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_max_m5(next)));
			(obj.value_max) = () => (-5);
			return obj;
		}
		Max_m5_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Max value -5");
			(obj.content) = () => ([(this?.Max_m5_number())]);
			return obj;
		}
		value_max_0(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Max_0_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_max_0(next)));
			(obj.value_max) = () => (0);
			return obj;
		}
		Max_0_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Max value 0");
			(obj.content) = () => ([(this?.Max_0_number())]);
			return obj;
		}
		value_max_5(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Max_5_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_max_5(next)));
			(obj.value_max) = () => (5);
			return obj;
		}
		Max_5_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Max value 5");
			(obj.content) = () => ([(this?.Max_5_number())]);
			return obj;
		}
		value_max_100(next){
			if(next !== undefined) return next;
			return 100;
		}
		Max_100_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_max_100(next)));
			(obj.value_max) = () => (100);
			(obj.precision_change) = () => (10);
			return obj;
		}
		Max_100_number_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Max value 100");
			(obj.content) = () => ([(this?.Max_100_number())]);
			return obj;
		}
		value_case1_range(next){
			if(next !== undefined) return next;
			return 0;
		}
		Range_case1_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_case1_range(next)));
			(obj.value_min) = () => (-5);
			(obj.value_max) = () => (5);
			return obj;
		}
		Range_number_case1_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Value from -5 to 5");
			(obj.content) = () => ([(this?.Range_case1_number())]);
			return obj;
		}
		value_case2_range(next){
			if(next !== undefined) return next;
			return null;
		}
		Range_case2_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_case2_range(next)));
			(obj.value_min) = () => (5);
			(obj.value_max) = () => (10);
			return obj;
		}
		Range_number_case2_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Value from 5 to 10");
			(obj.content) = () => ([(this?.Range_case2_number())]);
			return obj;
		}
		value_case3_range(next){
			if(next !== undefined) return next;
			return null;
		}
		Range_case3_number(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.value_case3_range(next)));
			(obj.value_min) = () => (-10);
			(obj.value_max) = () => (-5);
			return obj;
		}
		Range_number_case3_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Value from -10 to -5");
			(obj.content) = () => ([(this?.Range_case3_number())]);
			return obj;
		}
		Section_range_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Min_m5_number_label()), 
				(this?.Min_0_number_label()), 
				(this?.Min_5_number_label()), 
				(this?.Max_m5_number_label()), 
				(this?.Max_0_number_label()), 
				(this?.Max_5_number_label()), 
				(this?.Max_100_number_label()), 
				(this?.Range_number_case1_label()), 
				(this?.Range_number_case2_label()), 
				(this?.Range_number_case3_label())
			]);
			return obj;
		}
		Section_range(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Range");
			(obj.content) = () => ([(this?.Section_range_row())]);
			return obj;
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.Section_value()), 
				(this?.Section_initial()), 
				(this?.Section_disabled()), 
				(this?.Section_precision()), 
				(this?.Section_range())
			]);
			return obj;
		}
		title(){
			return "Number input control with various configuration";
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		sub(){
			return [(this?.Rows())];
		}
		tags(){
			return [
				"number", 
				"field", 
				"label", 
				"section"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/Number"];
		}
	};
	($mol_mem(($.$mol_number_demo.prototype), "Value_string"));
	($mol_mem(($.$mol_number_demo.prototype), "reset_value"));
	($mol_mem(($.$mol_number_demo.prototype), "Reset"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_value_bar"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_value_row"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_value"));
	($mol_mem(($.$mol_number_demo.prototype), "Initial_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Initial_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Hint_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Hint_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_initial_row"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_initial"));
	($mol_mem(($.$mol_number_demo.prototype), "Value_field_disabled_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Value_field_disabled_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Disabled_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Disabled_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Dec_disabled_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Dec_disabled_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Inc_disabled_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Inc_disabled_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_disabled_row"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_disabled"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_change_10_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_change_10_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_change_01_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_change_01_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_100_number_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_100_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_5_number_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_5_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_01_number_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_01_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_005_number_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_005_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_view_001_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_view_001_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_view_10_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Precision_view_10_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_precision_row"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_precision"));
	($mol_mem(($.$mol_number_demo.prototype), "value_min_m5"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_m5_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_m5_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_min_0"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_0_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_0_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_min_5"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_5_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Min_5_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_max_m5"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_m5_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_m5_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_max_0"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_0_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_0_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_max_5"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_5_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_5_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_max_100"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_100_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Max_100_number_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_case1_range"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_case1_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_number_case1_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_case2_range"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_case2_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_number_case2_label"));
	($mol_mem(($.$mol_number_demo.prototype), "value_case3_range"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_case3_number"));
	($mol_mem(($.$mol_number_demo.prototype), "Range_number_case3_label"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_range_row"));
	($mol_mem(($.$mol_number_demo.prototype), "Section_range"));
	($mol_mem(($.$mol_number_demo.prototype), "Rows"));
	($mol_mem(($.$mol_number_demo.prototype), "value"));

//# sourceMappingURL=demo.view.tree.js.map