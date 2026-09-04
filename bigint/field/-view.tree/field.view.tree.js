	($.$mol_bigint_field) = class $mol_bigint_field extends ($.$mol_bar) {
		decrement(next){
			if(next !== undefined) return next;
			return null;
		}
		increment(next){
			if(next !== undefined) return next;
			return null;
		}
		decrement_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		increment_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.decrement(next)), 
				"up": (next) => (this.increment(next)), 
				"pageDown": (next) => (this.decrement_boost(next)), 
				"pageUp": (next) => (this.increment_boost(next))
			});
			return obj;
		}
		decrement_enabled(){
			return (this.enabled());
		}
		Decrement_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Decrement(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.decrement(next)));
			(obj.enabled) = () => ((this.decrement_enabled()));
			(obj.sub) = () => ([(this.Decrement_icon())]);
			return obj;
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ("text");
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.selection) = (next) => ((this.selection(next)));
			return obj;
		}
		increment_enabled(){
			return (this.enabled());
		}
		Increment_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Increment(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.increment(next)));
			(obj.enabled) = () => ((this.increment_enabled()));
			(obj.sub) = () => ([(this.Increment_icon())]);
			return obj;
		}
		step(){
			return 1n;
		}
		boost(){
			return 10n;
		}
		value_min(){
			return null;
		}
		value_max(){
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return 0n;
		}
		enabled(next){
			if(next !== undefined) return next;
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.Decrement()), 
				(this.String()), 
				(this.Increment())
			];
		}
	};
	($mol_mem(($.$mol_bigint_field.prototype), "decrement"));
	($mol_mem(($.$mol_bigint_field.prototype), "increment"));
	($mol_mem(($.$mol_bigint_field.prototype), "decrement_boost"));
	($mol_mem(($.$mol_bigint_field.prototype), "increment_boost"));
	($mol_mem(($.$mol_bigint_field.prototype), "Hotkey"));
	($mol_mem(($.$mol_bigint_field.prototype), "Decrement_icon"));
	($mol_mem(($.$mol_bigint_field.prototype), "Decrement"));
	($mol_mem(($.$mol_bigint_field.prototype), "value_string"));
	($mol_mem(($.$mol_bigint_field.prototype), "submit"));
	($mol_mem(($.$mol_bigint_field.prototype), "selection"));
	($mol_mem(($.$mol_bigint_field.prototype), "String"));
	($mol_mem(($.$mol_bigint_field.prototype), "Increment_icon"));
	($mol_mem(($.$mol_bigint_field.prototype), "Increment"));
	($mol_mem(($.$mol_bigint_field.prototype), "value"));
	($mol_mem(($.$mol_bigint_field.prototype), "enabled"));

//# sourceMappingURL=field.view.tree.js.map