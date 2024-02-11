	($.$mol_attach_demo) = class $mol_attach_demo extends ($.$mol_example_small) {
		title(){
			return "Attach files an show them";
		}
		sub(){
			return [(this.Filled())];
		}
		tags(){
			return [
				"file", 
				"image", 
				"upload"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/File"];
		}
		filled_items(next){
			if(next !== undefined) return next;
			return ["https://picsum.photos/200"];
		}
		Filled(){
			const obj = new this.$.$mol_attach();
			(obj.items) = (next) => ((this.filled_items(next)));
			return obj;
		}
	};
	($mol_mem(($.$mol_attach_demo.prototype), "filled_items"));
	($mol_mem(($.$mol_attach_demo.prototype), "Filled"));

//# sourceMappingURL=demo.view.tree.js.map