	($.$mol_search_jumper) = class $mol_search_jumper extends ($.$mol_search) {
		index(next){
			if(next !== undefined) return next;
			return 0;
		}
		forward(next){
			return (this.Index().forward(next));
		}
		backward(next){
			return (this.Index().backward(next));
		}
		Backward(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_shift) = () => (true);
			(obj.key) = () => ({"enter": (next) => (this.backward(next))});
			return obj;
		}
		escape(next){
			if(next !== undefined) return next;
			return null;
		}
		Forward(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"enter": (next) => (this.forward(next)), "escape": (next) => (this.escape(next))});
			return obj;
		}
		Root(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Index(){
			const obj = new this.$.$mol_paginator();
			(obj.value) = (next) => ((this.index(next)));
			return obj;
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Backward()), 
				(this.Forward())
			];
		}
	};
	($mol_mem(($.$mol_search_jumper.prototype), "index"));
	($mol_mem(($.$mol_search_jumper.prototype), "Backward"));
	($mol_mem(($.$mol_search_jumper.prototype), "escape"));
	($mol_mem(($.$mol_search_jumper.prototype), "Forward"));
	($mol_mem(($.$mol_search_jumper.prototype), "Root"));
	($mol_mem(($.$mol_search_jumper.prototype), "Index"));

//# sourceMappingURL=jumper.view.tree.js.map