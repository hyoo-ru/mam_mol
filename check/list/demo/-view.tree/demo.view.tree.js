	($.$mol_check_list_demo) = class $mol_check_list_demo extends ($.$mol_example_small) {
		right(id, next){
			if(next !== undefined) return next;
			return false;
		}
		Rights(){
			const obj = new this.$.$mol_check_list();
			(obj.option_checked) = (id, next) => ((this?.right(id, next)));
			(obj.options) = () => ({
				"read": "Allow Read", 
				"write": "Allow Write", 
				"rights": "Allow Change Rights", 
				"backup": "Allow BackUp", 
				"restart": "Allow Restart", 
				"ping": "Allow Ping", 
				"api": "Allow API Access", 
				"docs": "Allow Read Documentation"
			});
			return obj;
		}
		title(){
			return "Set of toggles";
		}
		sub(){
			return [(this?.Rights())];
		}
		tags(){
			return [
				"option", 
				"switch", 
				"toggle"
			];
		}
		aspects(){
			return ["Widget/Control/Button"];
		}
	};
	($mol_mem_key(($.$mol_check_list_demo.prototype), "right"));
	($mol_mem(($.$mol_check_list_demo.prototype), "Rights"));

//# sourceMappingURL=demo.view.tree.js.map