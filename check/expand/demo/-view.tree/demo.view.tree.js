	($.$mol_check_expand_demo) = class $mol_check_expand_demo extends ($.$mol_example_small) {
		base_expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		c1Label(){
			return "Base";
		}
		Labeled_base(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.base_expanded(next)));
			(obj.title) = () => ((this.c1Label()));
			return obj;
		}
		c2Label(){
			return "Expanded";
		}
		expanded_expanded(next){
			if(next !== undefined) return next;
			return true;
		}
		Labeled_expanded(){
			const obj = new this.$.$mol_check_expand();
			(obj.title) = () => ((this.c2Label()));
			(obj.checked) = (next) => ((this.expanded_expanded(next)));
			return obj;
		}
		c5Label(){
			return "Non expandable";
		}
		Disabled(){
			const obj = new this.$.$mol_check_expand();
			(obj.title) = () => ((this.c5Label()));
			(obj.disabled) = () => (true);
			return obj;
		}
		Empty_base(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.base_expanded(next)));
			return obj;
		}
		Empty_expanded(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded_expanded(next)));
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Labeled_base()), 
				(this.Labeled_expanded()), 
				(this.Disabled()), 
				(this.Empty_base()), 
				(this.Empty_expanded())
			]);
			return obj;
		}
		title(){
			return "Checkbox-expand in various states";
		}
		sub(){
			return [(this.Demo_items())];
		}
		tags(){
			return ["fold"];
		}
		aspects(){
			return ["Widget/Control/Button", "Type/Boolean"];
		}
	};
	($mol_mem(($.$mol_check_expand_demo.prototype), "base_expanded"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Labeled_base"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "expanded_expanded"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Labeled_expanded"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Disabled"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Empty_base"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Empty_expanded"));
	($mol_mem(($.$mol_check_expand_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map