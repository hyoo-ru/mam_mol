	($.$mol_app_supplies_position) = class $mol_app_supplies_position extends ($.$mol_card) {
		product_title(){
			return "Product";
		}
		product_name(){
			return "";
		}
		Product_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.product_title()));
			(obj.content) = () => ([(this?.product_name())]);
			return obj;
		}
		cost_title(){
			return "Cost";
		}
		cost(){
			const obj = new this.$.$mol_unit_money();
			(obj.valueOf) = () => (0);
			return obj;
		}
		Cost(){
			const obj = new this.$.$mol_cost();
			(obj.value) = () => ((this?.cost()));
			return obj;
		}
		Cost_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.cost_title()));
			(obj.content) = () => ([(this?.Cost())]);
			return obj;
		}
		Main_group(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Product_item()), (this?.Cost_item())]);
			return obj;
		}
		division_title(){
			return "Division";
		}
		division_name(){
			return "";
		}
		Division_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.division_title()));
			(obj.content) = () => ([(this?.division_name())]);
			return obj;
		}
		price_label(){
			return "Price";
		}
		price(){
			const obj = new this.$.$mol_unit_money();
			(obj.valueOf) = () => (0);
			return obj;
		}
		Price(){
			const obj = new this.$.$mol_cost();
			(obj.value) = () => ((this?.price()));
			return obj;
		}
		Price_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.price_label()));
			(obj.content) = () => ([(this?.Price())]);
			return obj;
		}
		Addon_group(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Division_item()), (this?.Price_item())]);
			return obj;
		}
		quantity_title(){
			return "Quantity";
		}
		quantity(){
			return "";
		}
		Quantity_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.quantity_title()));
			(obj.content) = () => ([(this?.quantity())]);
			return obj;
		}
		supply_date_title(){
			return "Supply date";
		}
		supply_date(){
			return "";
		}
		Supply_date_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.supply_date_title()));
			(obj.content) = () => ([(this?.supply_date())]);
			return obj;
		}
		store_title(){
			return "Store";
		}
		store_name(){
			return "";
		}
		Store_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.store_title()));
			(obj.content) = () => ([(this?.store_name())]);
			return obj;
		}
		Supply_group(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Quantity_item()), 
				(this?.Supply_date_item()), 
				(this?.Store_item())
			]);
			return obj;
		}
		Row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this?.Main_group()), 
				(this?.Addon_group()), 
				(this?.Supply_group())
			]);
			return obj;
		}
		minimal_height(){
			return 64;
		}
		position(){
			const obj = new this.$.$mol_app_supplies_domain_supply_position();
			return obj;
		}
		Content(){
			return (this?.Row());
		}
	};
	($mol_mem(($.$mol_app_supplies_position.prototype), "Product_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "cost"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Cost"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Cost_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Main_group"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Division_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "price"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Price"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Price_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Addon_group"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Quantity_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Supply_date_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Store_item"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Supply_group"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "Row"));
	($mol_mem(($.$mol_app_supplies_position.prototype), "position"));

//# sourceMappingURL=position.view.tree.js.map