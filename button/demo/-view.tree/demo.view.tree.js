	($.$mol_button_demo) = class $mol_button_demo extends ($.$mol_example_small) {
		fail(next){
			if(next !== undefined) return next;
			return null;
		}
		Major_enabled(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("Enabled Major");
			(obj.click) = (next) => ((this.fail(next)));
			return obj;
		}
		Major_disabled(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("Disabled Major");
			(obj.enabled) = () => (false);
			return obj;
		}
		Minor_enabled(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Enabled Minor");
			(obj.click) = (next) => ((this.fail(next)));
			return obj;
		}
		Minor_disabled(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Disabled Minor");
			(obj.enabled) = () => (false);
			return obj;
		}
		Minor_icon_only_icon(){
			const obj = new this.$.$mol_icon_cursor_default_click_outline();
			return obj;
		}
		Minor_icon_only(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.fail(next)));
			(obj.sub) = () => ([(this.Minor_icon_only_icon())]);
			return obj;
		}
		Minor_iconed_icon(){
			const obj = new this.$.$mol_icon_cursor_default_click_outline();
			return obj;
		}
		Minor_iconed(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.fail(next)));
			(obj.sub) = () => ([(this.Minor_iconed_icon()), "Minor with Icon"]);
			return obj;
		}
		title(){
			return "All types of buttons in every states";
		}
		sub(){
			return [
				(this.Major_enabled()), 
				(this.Major_disabled()), 
				(this.Minor_enabled()), 
				(this.Minor_disabled()), 
				(this.Minor_icon_only()), 
				(this.Minor_iconed())
			];
		}
		aspects(){
			return ["Widget/Control/Button"];
		}
	};
	($mol_mem(($.$mol_button_demo.prototype), "fail"));
	($mol_mem(($.$mol_button_demo.prototype), "Major_enabled"));
	($mol_mem(($.$mol_button_demo.prototype), "Major_disabled"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_enabled"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_disabled"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_icon_only_icon"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_icon_only"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_iconed_icon"));
	($mol_mem(($.$mol_button_demo.prototype), "Minor_iconed"));

//# sourceMappingURL=demo.view.tree.js.map