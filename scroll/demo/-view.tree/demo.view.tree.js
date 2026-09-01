	($.$mol_scroll_demo) = class $mol_scroll_demo extends ($.$mol_example_large) {
		Filler0(){
			const obj = new this.$.$mol_filler();
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
		Filler3(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler4(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler5(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler6(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler7(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler8(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Filler9(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Filler0()), 
				(this.Filler1()), 
				(this.Filler2()), 
				(this.Filler3()), 
				(this.Filler4()), 
				(this.Filler5()), 
				(this.Filler6()), 
				(this.Filler7()), 
				(this.Filler8()), 
				(this.Filler9())
			]);
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Content())]);
			return obj;
		}
		title(){
			return "Simple scroll pane";
		}
		sub(){
			return [(this.Scroll())];
		}
		tags(){
			return ["scroll", "container"];
		}
		aspects(){
			return ["Widget/Scroll"];
		}
	};
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler0"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler1"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler2"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler3"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler4"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler5"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler6"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler7"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler8"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Filler9"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Content"));
	($mol_mem(($.$mol_scroll_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map