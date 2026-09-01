	($.$mol_switch_demo) = class $mol_switch_demo extends ($.$mol_example) {
		color(next){
			if(next !== undefined) return next;
			return "red";
		}
		option_red(){
			return "Red";
		}
		option_green(){
			return "Green";
		}
		option_blue(){
			return "Blue";
		}
		option_infernal(){
			return "Color which can not be displayed on your device";
		}
		Enabled(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.color(next)));
			(obj.options) = () => ({
				"red": (this.option_red()), 
				"green": (this.option_green()), 
				"blue": (this.option_blue()), 
				"infernal": (this.option_infernal())
			});
			return obj;
		}
		Enabled_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Read/Write");
			(obj.Content) = () => ((this.Enabled()));
			return obj;
		}
		Disabled(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.color(next)));
			(obj.enabled) = () => (false);
			(obj.options) = () => ({
				"red": (this.option_red()), 
				"green": (this.option_green()), 
				"blue": (this.option_blue())
			});
			return obj;
		}
		Disabled_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Read only");
			(obj.Content) = () => ((this.Disabled()));
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.sub) = () => ([(this.Enabled_labeler()), (this.Disabled_labeler())]);
			return obj;
		}
		title(){
			return "Color switchers in various state";
		}
		sub(){
			return [(this.Demo_items())];
		}
		tags(){
			return [
				"option", 
				"group", 
				"radio"
			];
		}
		aspects(){
			return ["Widget/Control"];
		}
	};
	($mol_mem(($.$mol_switch_demo.prototype), "color"));
	($mol_mem(($.$mol_switch_demo.prototype), "Enabled"));
	($mol_mem(($.$mol_switch_demo.prototype), "Enabled_labeler"));
	($mol_mem(($.$mol_switch_demo.prototype), "Disabled"));
	($mol_mem(($.$mol_switch_demo.prototype), "Disabled_labeler"));
	($mol_mem(($.$mol_switch_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map