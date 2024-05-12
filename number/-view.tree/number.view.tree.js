	($.$mol_number) = class $mol_number extends ($.$mol_view) {
		precision(){
			return 1;
		}
		type(){
			return "tel";
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this?.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this?.type()));
			(obj.value) = (next) => ((this?.value_string(next)));
			(obj.hint) = () => ((this?.hint()));
			(obj.enabled) = () => ((this?.string_enabled()));
			(obj.submit) = (next) => ((this?.submit(next)));
			return obj;
		}
		event_dec(next){
			if(next !== undefined) return next;
			return null;
		}
		dec_enabled(){
			return (this?.enabled());
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_minus();
			return obj;
		}
		Dec(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this?.event_dec(next)));
			(obj.enabled) = () => ((this?.dec_enabled()));
			(obj.sub) = () => ([(this?.dec_icon())]);
			return obj;
		}
		event_inc(next){
			if(next !== undefined) return next;
			return null;
		}
		inc_enabled(){
			return (this?.enabled());
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Inc(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this?.event_inc(next)));
			(obj.enabled) = () => ((this?.inc_enabled()));
			(obj.sub) = () => ([(this?.inc_icon())]);
			return obj;
		}
		precision_view(){
			return (this?.precision());
		}
		precision_change(){
			return (this?.precision());
		}
		value_min(){
			return -Infinity;
		}
		value_max(){
			return +Infinity;
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		enabled(){
			return true;
		}
		sub(){
			return [
				(this?.String()), 
				(this?.Dec()), 
				(this?.Inc())
			];
		}
	};
	($mol_mem(($.$mol_number.prototype), "value_string"));
	($mol_mem(($.$mol_number.prototype), "submit"));
	($mol_mem(($.$mol_number.prototype), "String"));
	($mol_mem(($.$mol_number.prototype), "event_dec"));
	($mol_mem(($.$mol_number.prototype), "dec_icon"));
	($mol_mem(($.$mol_number.prototype), "Dec"));
	($mol_mem(($.$mol_number.prototype), "event_inc"));
	($mol_mem(($.$mol_number.prototype), "inc_icon"));
	($mol_mem(($.$mol_number.prototype), "Inc"));
	($mol_mem(($.$mol_number.prototype), "value"));

//# sourceMappingURL=number.view.tree.js.map