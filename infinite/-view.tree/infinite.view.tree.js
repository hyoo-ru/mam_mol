	($.$mol_infinite) = class $mol_infinite extends ($.$mol_list) {
		before(id){
			return [];
		}
		after(id){
			return [];
		}
		row_ids(next){
			if(next !== undefined) return next;
			return [];
		}
		render_over(){
			return 1;
		}
		Row(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Before(id){
			const obj = new this.$.$mol_view();
			(obj.minimal_width) = () => (0);
			(obj.minimal_height) = () => (0);
			(obj.sub) = () => ([(this.before_load(id))]);
			return obj;
		}
		After(id){
			const obj = new this.$.$mol_view();
			(obj.minimal_width) = () => (0);
			(obj.minimal_height) = () => (0);
			(obj.sub) = () => ([(this.after_load(id))]);
			return obj;
		}
		before_load(id){
			return null;
		}
		after_load(id){
			return null;
		}
	};
	($mol_mem(($.$mol_infinite.prototype), "row_ids"));
	($mol_mem_key(($.$mol_infinite.prototype), "Row"));
	($mol_mem_key(($.$mol_infinite.prototype), "Before"));
	($mol_mem_key(($.$mol_infinite.prototype), "After"));

//# sourceMappingURL=infinite.view.tree.js.map