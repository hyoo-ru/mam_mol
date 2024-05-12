	($.$mol_app_supplies_list) = class $mol_app_supplies_list extends ($.$mol_page) {
		search_hint(){
			return "Search supply by bar code";
		}
		search_query(next){
			if(next !== undefined) return next;
			return "";
		}
		Search(){
			const obj = new this.$.$mol_code();
			(obj.hint) = () => ((this?.search_hint()));
			(obj.value) = (next) => ((this?.search_query(next)));
			return obj;
		}
		supply_rows(){
			return [];
		}
		Supply_rows(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this?.supply_rows()));
			return obj;
		}
		supply(id){
			return null;
		}
		supply_id(id){
			return "";
		}
		supply_arg(id){
			return {"supply": (this?.supply_id(id))};
		}
		supplies(){
			return [];
		}
		tools(){
			return [(this?.Search())];
		}
		body(){
			return [(this?.Supply_rows())];
		}
		Supply_row(id){
			const obj = new this.$.$mol_app_supplies_card();
			(obj.supply) = () => ((this?.supply(id)));
			(obj.arg) = () => ((this?.supply_arg(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_app_supplies_list.prototype), "search_query"));
	($mol_mem(($.$mol_app_supplies_list.prototype), "Search"));
	($mol_mem(($.$mol_app_supplies_list.prototype), "Supply_rows"));
	($mol_mem_key(($.$mol_app_supplies_list.prototype), "Supply_row"));

//# sourceMappingURL=list.view.tree.js.map