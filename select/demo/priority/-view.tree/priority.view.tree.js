	($.$mol_select_demo_priority) = class $mol_select_demo_priority extends ($.$mol_example_small) {
		title(){
			return "Priority picker";
		}
		sub(){
			return [(this.Priority())];
		}
		tags(){
			return ["select", "priority"];
		}
		aspects(){
			return ["Widget/Control"];
		}
		priority(next){
			if(next !== undefined) return next;
			return "Lowest";
		}
		Priority(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.value) = (next) => ((this.priority(next)));
			(obj.options) = () => ([
				"Highest ", 
				"High", 
				"Medium", 
				"Low", 
				"Lowest"
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_select_demo_priority.prototype), "priority"));
	($mol_mem(($.$mol_select_demo_priority.prototype), "Priority"));

//# sourceMappingURL=priority.view.tree.js.map