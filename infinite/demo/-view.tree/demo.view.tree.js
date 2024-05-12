	($.$mol_infinite_demo) = class $mol_infinite_demo extends ($.$mol_example_large) {
		before(id){
			return [];
		}
		after(id){
			return [];
		}
		id(id){
			return "";
		}
		Photo(id){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this?.id(id)));
			return obj;
		}
		name(id){
			return "";
		}
		Name(id){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => ((this?.name(id)));
			return obj;
		}
		city(id){
			return "";
		}
		City(id){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => ((this?.city(id)));
			return obj;
		}
		Info(id){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Name(id)), (this?.City(id))]);
			return obj;
		}
		Item(id){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Photo(id)), (this?.Info(id))]);
			return obj;
		}
		List(){
			const obj = new this.$.$mol_infinite();
			(obj.before) = (id) => ((this?.before(id)));
			(obj.after) = (id) => ((this?.after(id)));
			(obj.Row) = (id) => ((this?.Item(id)));
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this?.List())]);
			return obj;
		}
		title(){
			return "Infinite list demo";
		}
		chunk_size(){
			return 20;
		}
		sub(){
			return [(this?.Scroll())];
		}
		tags(){
			return [
				"avatar", 
				"infinite", 
				"scroll", 
				"virtual", 
				"container"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem_key(($.$mol_infinite_demo.prototype), "Photo"));
	($mol_mem_key(($.$mol_infinite_demo.prototype), "Name"));
	($mol_mem_key(($.$mol_infinite_demo.prototype), "City"));
	($mol_mem_key(($.$mol_infinite_demo.prototype), "Info"));
	($mol_mem_key(($.$mol_infinite_demo.prototype), "Item"));
	($mol_mem(($.$mol_infinite_demo.prototype), "List"));
	($mol_mem(($.$mol_infinite_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map