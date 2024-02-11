	($.$mol_check_box_demo) = class $mol_check_box_demo extends ($.$mol_example_small) {
		title(){
			return "Checkboxes in various states";
		}
		sub(){
			return [(this.Demo_items())];
		}
		tags(){
			return ["switch", "toggle"];
		}
		aspects(){
			return ["Widget/Control/Button", "Type/Boolean"];
		}
		base_checked(next){
			if(next !== undefined) return next;
			return false;
		}
		c1Label(){
			return "Base";
		}
		Labeled_base(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.base_checked(next)));
			(obj.title) = () => ((this.c1Label()));
			return obj;
		}
		c2Label(){
			return "Checked";
		}
		checked_checked(next){
			if(next !== undefined) return next;
			return true;
		}
		Labeled_checked(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.c2Label()));
			(obj.checked) = (next) => ((this.checked_checked(next)));
			return obj;
		}
		c6Label(){
			return "Disabled";
		}
		Labeled_disabled(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.c6Label()));
			(obj.checked) = () => (true);
			(obj.enabled) = () => (false);
			return obj;
		}
		Alone_base(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.base_checked(next)));
			return obj;
		}
		Alone_checked(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.checked_checked(next)));
			return obj;
		}
		Alone_disabled(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = () => (true);
			(obj.enabled) = () => (false);
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Labeled_base()), 
				(this.Labeled_checked()), 
				(this.Labeled_disabled()), 
				(this.Alone_base()), 
				(this.Alone_checked()), 
				(this.Alone_disabled())
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_check_box_demo.prototype), "base_checked"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Labeled_base"));
	($mol_mem(($.$mol_check_box_demo.prototype), "checked_checked"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Labeled_checked"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Labeled_disabled"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Alone_base"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Alone_checked"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Alone_disabled"));
	($mol_mem(($.$mol_check_box_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map