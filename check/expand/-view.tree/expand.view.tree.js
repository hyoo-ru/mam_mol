	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));

//# sourceMappingURL=expand.view.tree.js.map