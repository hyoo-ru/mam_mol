	($.$mol_app_supplies) = class $mol_app_supplies extends ($.$mol_book2) {
		attr(){
			return {...(super.attr()), "mol_theme": "$mol_theme_auto"};
		}
		enter(){
			const obj = new this.$.$mol_app_supplies_enter();
			(obj.entered) = (next) => ((this.entered(next)));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_app_supplies_list();
			(obj.supplies) = () => ((this.supplies()));
			(obj.tools) = () => ((this.tools_root()));
			(obj.title) = () => ((this.list_title()));
			(obj.search_query) = (next) => ((this.supply_id(next)));
			return obj;
		}
		Detail(id){
			const obj = new this.$.$mol_app_supplies_detail();
			(obj.supply) = () => ((this.supply()));
			return obj;
		}
		entered(next){
			if(next !== undefined) return next;
			return false;
		}
		supplies(){
			return [];
		}
		tools_root(){
			return [];
		}
		list_title(){
			return "Supplies";
		}
		supply_id(next){
			if(next !== undefined) return next;
			return "";
		}
		supply(){
			return null;
		}
	};
	($mol_mem(($.$mol_app_supplies.prototype), "enter"));
	($mol_mem(($.$mol_app_supplies.prototype), "List"));
	($mol_mem_key(($.$mol_app_supplies.prototype), "Detail"));
	($mol_mem(($.$mol_app_supplies.prototype), "entered"));
	($mol_mem(($.$mol_app_supplies.prototype), "supply_id"));

//# sourceMappingURL=supplies.view.tree.js.map