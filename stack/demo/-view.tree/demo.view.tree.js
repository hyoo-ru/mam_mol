	($.$mol_stack_demo) = class $mol_stack_demo extends ($.$mol_example_small) {
		sub(){
			return [(this.Collage())];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		Back(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ("https://cataas.com/cat");
			return obj;
		}
		Front(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["❤🧡💛💚💙💜🤎🖤"]);
			return obj;
		}
		Collage(){
			const obj = new this.$.$mol_stack();
			(obj.sub) = () => ([(this.Back()), (this.Front())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_stack_demo.prototype), "Back"));
	($mol_mem(($.$mol_stack_demo.prototype), "Front"));
	($mol_mem(($.$mol_stack_demo.prototype), "Collage"));

//# sourceMappingURL=demo.view.tree.js.map