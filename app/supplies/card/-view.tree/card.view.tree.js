	($.$mol_app_supplies_card) = class $mol_app_supplies_card extends ($.$mol_link) {
		status(){
			return "";
		}
		code_title(){
			return "Code";
		}
		code(){
			return "";
		}
		Code_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.code_title()));
			(obj.content) = () => ([(this?.code())]);
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
		provider_title(){
			return "Provider";
		}
		provider_name(){
			return "";
		}
		Provider_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this?.provider_title()));
			(obj.content) = () => ([(this?.provider_name())]);
			return obj;
		}
		items(){
			return [
				(this?.Code_item()), 
				(this?.Cost_item()), 
				(this?.Provider_item())
			];
		}
		Group(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this?.items()));
			return obj;
		}
		Card(){
			const obj = new this.$.$mol_card();
			(obj.status) = () => ((this?.status()));
			(obj.Content) = () => ((this?.Group()));
			return obj;
		}
		supply(){
			return null;
		}
		minimal_height(){
			return 125;
		}
		sub(){
			return [(this?.Card())];
		}
	};
	($mol_mem(($.$mol_app_supplies_card.prototype), "Code_item"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "cost"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "Cost"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "Cost_item"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "Provider_item"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "Group"));
	($mol_mem(($.$mol_app_supplies_card.prototype), "Card"));

//# sourceMappingURL=card.view.tree.js.map