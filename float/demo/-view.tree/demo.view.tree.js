	($.$mol_float_demo) = class $mol_float_demo extends ($.$mol_example_large) {
		title(){
			return "Floating header example";
		}
		sub(){
			return [(this.Scroll())];
		}
		tags(){
			return ["scroll", "container"];
		}
		aspects(){
			return ["Widget/Float"];
		}
		Head_content(){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => ("Float header");
			return obj;
		}
		Head_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Head_content())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_float();
			(obj.sub) = () => ([(this.Head_row())]);
			return obj;
		}
		Filler1(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler2(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Filler1()), (this.Filler2())]);
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Head()), (this.Content())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_float_demo.prototype), "Head_content"));
	($mol_mem(($.$mol_float_demo.prototype), "Head_row"));
	($mol_mem(($.$mol_float_demo.prototype), "Head"));
	($mol_mem(($.$mol_float_demo.prototype), "Filler1"));
	($mol_mem(($.$mol_float_demo.prototype), "Filler2"));
	($mol_mem(($.$mol_float_demo.prototype), "Content"));
	($mol_mem(($.$mol_float_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map