	($.$mol_list_demo_tree) = class $mol_list_demo_tree extends ($.$mol_example_large) {
		title(){
			return "Large list of rows with dynamic content";
		}
		sub(){
			return [(this.Content())];
		}
		Row(id){
			const obj = new this.$.$mol_expander();
			(obj.label) = () => ([(this.Row_title(id))]);
			(obj.expanded) = (next) => ((this.row_expanded(id, next)));
			(obj.expandable) = () => (true);
			(obj.Content) = () => ((this.Row_content(id)));
			return obj;
		}
		tags(){
			return [
				"list", 
				"tree", 
				"hierarchy", 
				"container", 
				"nested"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		root_rows(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.root_rows()));
			return obj;
		}
		row_title(id){
			return "";
		}
		Row_title(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.row_title(id))]);
			return obj;
		}
		row_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		row_content(id){
			return [];
		}
		Row_content(id){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.row_content(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_list_demo_tree.prototype), "Row"));
	($mol_mem(($.$mol_list_demo_tree.prototype), "Content"));
	($mol_mem_key(($.$mol_list_demo_tree.prototype), "Row_title"));
	($mol_mem_key(($.$mol_list_demo_tree.prototype), "row_expanded"));
	($mol_mem_key(($.$mol_list_demo_tree.prototype), "Row_content"));

//# sourceMappingURL=tree.view.tree.js.map