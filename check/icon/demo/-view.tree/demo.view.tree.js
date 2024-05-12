	($.$mol_check_icon_demo) = class $mol_check_icon_demo extends ($.$mol_example_small) {
		Base_icon(){
			const obj = new this.$.$mol_icon_microphone();
			return obj;
		}
		base_checked(next){
			if(next !== undefined) return next;
			return false;
		}
		Base(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this?.Base_icon()));
			(obj.checked) = (next) => ((this?.base_checked(next)));
			return obj;
		}
		Checked_icon(){
			const obj = new this.$.$mol_icon_microphone();
			return obj;
		}
		checked_checked(next){
			if(next !== undefined) return next;
			return true;
		}
		Checked(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this?.Checked_icon()));
			(obj.checked) = (next) => ((this?.checked_checked(next)));
			return obj;
		}
		Disabled_icon(){
			const obj = new this.$.$mol_icon_microphone();
			return obj;
		}
		Disabled(){
			const obj = new this.$.$mol_check_box();
			(obj.Icon) = () => ((this?.Disabled_icon()));
			(obj.checked) = () => (true);
			(obj.enabled) = () => (false);
			return obj;
		}
		title(){
			return "Iconic checkboxes in various states";
		}
		sub(){
			return [
				(this?.Base()), 
				(this?.Checked()), 
				(this?.Disabled())
			];
		}
		tags(){
			return ["switch", "toggle"];
		}
		aspects(){
			return ["Widget/Control/Button"];
		}
	};
	($mol_mem(($.$mol_check_icon_demo.prototype), "Base_icon"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "base_checked"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "Base"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "Checked_icon"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "checked_checked"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "Checked"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "Disabled_icon"));
	($mol_mem(($.$mol_check_icon_demo.prototype), "Disabled"));

//# sourceMappingURL=demo.view.tree.js.map