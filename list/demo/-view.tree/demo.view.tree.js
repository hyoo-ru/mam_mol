	($.$mol_list_demo) = class $mol_list_demo extends ($.$mol_example_small) {
		items_count(next){
			if(next !== undefined) return next;
			return 50;
		}
		Items_count(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.items_count(next)));
			(obj.value_min) = () => (0);
			(obj.value_max) = () => (100000);
			return obj;
		}
		Items_count_label(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Items count");
			(obj.content) = () => ([(this?.Items_count())]);
			return obj;
		}
		item_title(id){
			return "";
		}
		Item(id){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this?.item_title(id)));
			return obj;
		}
		list_items(){
			return [(this?.Item("0"))];
		}
		List_empty(){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => ("No items in this list");
			return obj;
		}
		Items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this?.list_items()));
			(obj.Empty) = () => ((this?.List_empty()));
			return obj;
		}
		sub(){
			return [(this?.Items_count_label()), (this?.Items())];
		}
		tags(){
			return [
				"list", 
				"rows", 
				"stack"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_list_demo.prototype), "items_count"));
	($mol_mem(($.$mol_list_demo.prototype), "Items_count"));
	($mol_mem(($.$mol_list_demo.prototype), "Items_count_label"));
	($mol_mem_key(($.$mol_list_demo.prototype), "Item"));
	($mol_mem(($.$mol_list_demo.prototype), "List_empty"));
	($mol_mem(($.$mol_list_demo.prototype), "Items"));

//# sourceMappingURL=demo.view.tree.js.map