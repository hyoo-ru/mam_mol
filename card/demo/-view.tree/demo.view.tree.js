	($.$mol_card_demo) = class $mol_card_demo extends ($.$mol_example_small) {
		Simple(){
			const obj = new this.$.$mol_card();
			(obj.content) = () => (["Hello world!"]);
			return obj;
		}
		Pending(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Hello pending!");
			(obj.status) = () => ("pending");
			return obj;
		}
		title(){
			return "Cards with optional status";
		}
		sub(){
			return [(this?.Simple()), (this?.Pending())];
		}
		tags(){
			return [
				"status", 
				"container", 
				"sticker"
			];
		}
		aspects(){
			return ["Widget/Layout", "Widget/Island"];
		}
	};
	($mol_mem(($.$mol_card_demo.prototype), "Simple"));
	($mol_mem(($.$mol_card_demo.prototype), "Pending"));

//# sourceMappingURL=demo.view.tree.js.map