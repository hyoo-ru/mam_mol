	($.$mol_cost) = class $mol_cost extends ($.$mol_view) {
		value(){
			return null;
		}
		sub(){
			return [
				(this.Prefix()), 
				(this.Value()), 
				(this.Postfix())
			];
		}
		prefix(){
			return "";
		}
		Prefix(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.prefix())]);
			return obj;
		}
		value_view(){
			return "";
		}
		Value(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.value_view())]);
			return obj;
		}
		postfix(){
			return "";
		}
		Postfix(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.postfix())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_cost.prototype), "Prefix"));
	($mol_mem(($.$mol_cost.prototype), "Value"));
	($mol_mem(($.$mol_cost.prototype), "Postfix"));

//# sourceMappingURL=cost.view.tree.js.map