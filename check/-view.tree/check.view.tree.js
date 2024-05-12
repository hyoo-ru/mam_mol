	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this?.title())]);
			return obj;
		}
		label(){
			return [(this?.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this?.checked()), 
				"aria-checked": (this?.aria_checked()), 
				"role": (this?.aria_role())
			};
		}
		sub(){
			return [(this?.Icon()), (this?.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));

//# sourceMappingURL=check.view.tree.js.map