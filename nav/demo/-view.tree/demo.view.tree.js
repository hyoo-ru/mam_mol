	($.$mol_nav_demo) = class $mol_nav_demo extends ($.$mol_example) {
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_x) = () => ((this?.tab_list()));
			(obj.current_x) = (next) => ((this?.tab_current(next)));
			(obj.keys_y) = () => ((this?.row_list()));
			(obj.current_y) = (next) => ((this?.row_current(next)));
			return obj;
		}
		tab_list(){
			return (this?.Tab_list()?.keys());
		}
		tab_current(next){
			if(next !== undefined) return next;
			return "";
		}
		Tab_list(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.tab_current(next)));
			(obj.options) = () => ({
				"first": "First", 
				"second": "Second", 
				"third": "Third"
			});
			return obj;
		}
		row_list(){
			return (this?.Row_list()?.keys());
		}
		row_current(next){
			if(next !== undefined) return next;
			return "";
		}
		Row_list(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.row_current(next)));
			(obj.options) = () => ({
				"first": "First", 
				"second": "Second", 
				"third": "Third"
			});
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_card();
			(obj.content) = () => ([(this?.Tab_list()), (this?.Row_list())]);
			(obj.status) = () => ("Select option and use keys to switch");
			return obj;
		}
		title(){
			return "Number input control with various configuration";
		}
		plugins(){
			return [(this?.Nav())];
		}
		sub(){
			return [(this?.Demo_items())];
		}
		tags(){
			return ["navigation"];
		}
		aspects(){
			return ["Widget/Plugin", "Controler/Keyboard"];
		}
	};
	($mol_mem(($.$mol_nav_demo.prototype), "Nav"));
	($mol_mem(($.$mol_nav_demo.prototype), "tab_current"));
	($mol_mem(($.$mol_nav_demo.prototype), "Tab_list"));
	($mol_mem(($.$mol_nav_demo.prototype), "row_current"));
	($mol_mem(($.$mol_nav_demo.prototype), "Row_list"));
	($mol_mem(($.$mol_nav_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map