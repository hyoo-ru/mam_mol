	($.$mol_portion_demo) = class $mol_portion_demo extends ($.$mol_example_small) {
		fist(){
			return 0;
		}
		Empty(){
			const obj = new this.$.$mol_portion();
			(obj.portion) = () => ((this.fist()));
			return obj;
		}
		second(){
			return 0.5;
		}
		Partial(){
			const obj = new this.$.$mol_portion();
			(obj.portion) = () => ((this.second()));
			return obj;
		}
		third(){
			return 1;
		}
		Full(){
			const obj = new this.$.$mol_portion();
			(obj.portion) = () => ((this.third()));
			return obj;
		}
		title(){
			return "Progress bar in various states";
		}
		sub(){
			return [
				(this.Empty()), 
				(this.Partial()), 
				(this.Full())
			];
		}
		tags(){
			return ["progress", "slider"];
		}
		aspects(){
			return ["Widget/Draw/Chart/Bar"];
		}
	};
	($mol_mem(($.$mol_portion_demo.prototype), "Empty"));
	($mol_mem(($.$mol_portion_demo.prototype), "Partial"));
	($mol_mem(($.$mol_portion_demo.prototype), "Full"));

//# sourceMappingURL=demo.view.tree.js.map