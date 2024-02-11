	($.$mol_expander_demo) = class $mol_expander_demo extends ($.$mol_example_small) {
		title(){
			return "Simple spoiler";
		}
		sub(){
			return [(this.Expander())];
		}
		tags(){
			return [
				"expander", 
				"accordion", 
				"expand", 
				"container", 
				"fold"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		Content(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Expander(){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ("Lorem Ipsum");
			(obj.content) = () => ([(this.Content())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_expander_demo.prototype), "Content"));
	($mol_mem(($.$mol_expander_demo.prototype), "Expander"));

//# sourceMappingURL=demo.view.tree.js.map