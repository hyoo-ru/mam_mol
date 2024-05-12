	($.$mol_pick_time) = class $mol_pick_time extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		Input(){
			const obj = new this.$.$mol_format();
			(obj.value) = (next) => ((this?.value(next)));
			(obj.mask) = () => ("__:__");
			(obj.allow) = () => ("0123456789.");
			(obj.enabled) = () => ((this?.enabled()));
			return obj;
		}
		hour_selected(next){
			if(next !== undefined) return next;
			return "";
		}
		hour_options(){
			return {};
		}
		Hours(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.hour_selected(next)));
			(obj.options) = () => ((this?.hour_options()));
			return obj;
		}
		Delimiter(){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => (":");
			return obj;
		}
		minute_selected(next){
			if(next !== undefined) return next;
			return "";
		}
		minute_options(){
			return {};
		}
		Minutes(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.minute_selected(next)));
			(obj.options) = () => ((this?.minute_options()));
			return obj;
		}
		Pickers(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Hours()), 
				(this?.Delimiter()), 
				(this?.Minutes())
			]);
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clock_outline();
			return obj;
		}
		trigger_enabled(){
			return (this?.enabled());
		}
		bubble_content(){
			return [(this?.Input()), (this?.Pickers())];
		}
		value_moment(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_pick_time.prototype), "value"));
	($mol_mem(($.$mol_pick_time.prototype), "Input"));
	($mol_mem(($.$mol_pick_time.prototype), "hour_selected"));
	($mol_mem(($.$mol_pick_time.prototype), "Hours"));
	($mol_mem(($.$mol_pick_time.prototype), "Delimiter"));
	($mol_mem(($.$mol_pick_time.prototype), "minute_selected"));
	($mol_mem(($.$mol_pick_time.prototype), "Minutes"));
	($mol_mem(($.$mol_pick_time.prototype), "Pickers"));
	($mol_mem(($.$mol_pick_time.prototype), "Icon"));
	($mol_mem(($.$mol_pick_time.prototype), "value_moment"));

//# sourceMappingURL=time.view.tree.js.map