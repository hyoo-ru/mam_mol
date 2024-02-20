	($.$mol_app_supplies_detail) = class $mol_app_supplies_detail extends ($.$mol_page) {
		Close_icon(){
			const obj = new this.$.$mol_icon_cross();
			return obj;
		}
		close_arg(){
			return {"supply": null};
		}
		Close(){
			const obj = new this.$.$mol_link();
			(obj.sub) = () => ([(this.Close_icon())]);
			(obj.arg) = () => ((this.close_arg()));
			return obj;
		}
		org_title(){
			return "Organization";
		}
		provider_title(){
			return "Provider";
		}
		provider_name(){
			return "";
		}
		Provider(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.provider_title()));
			(obj.content) = () => ([(this.provider_name())]);
			return obj;
		}
		customer_label(){
			return "Consumer";
		}
		consumer_name(){
			return "";
		}
		Consumer(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.customer_label()));
			(obj.content) = () => ([(this.consumer_name())]);
			return obj;
		}
		supply_group_title(){
			return "Supply Group";
		}
		supply_group_name(){
			return "";
		}
		Supply_group(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.supply_group_title()));
			(obj.content) = () => ([(this.supply_group_name())]);
			return obj;
		}
		ballance_unit_title(){
			return "Ballance Unit";
		}
		ballance_unit_name(){
			return "";
		}
		Ballance_unit_item(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.ballance_unit_title()));
			(obj.content) = () => ([(this.ballance_unit_name())]);
			return obj;
		}
		org_items(){
			return [
				(this.Provider()), 
				(this.Consumer()), 
				(this.Supply_group()), 
				(this.Ballance_unit_item())
			];
		}
		Org(){
			const obj = new this.$.$mol_row();
			(obj.title) = () => ((this.org_title()));
			(obj.sub) = () => ((this.org_items()));
			return obj;
		}
		cons_title(){
			return "Consumer";
		}
		contract_title(){
			return "Contract";
		}
		contract_id(){
			return "";
		}
		Contract(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.contract_title()));
			(obj.content) = () => ([(this.contract_id())]);
			return obj;
		}
		pay_method_title(){
			return "Pay Method";
		}
		pay_method_name(){
			return "";
		}
		Pay_method(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.pay_method_title()));
			(obj.content) = () => ([(this.pay_method_name())]);
			return obj;
		}
		manager_title(){
			return "Manager";
		}
		manager_name(){
			return "";
		}
		Manager(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.manager_title()));
			(obj.content) = () => ([(this.manager_name())]);
			return obj;
		}
		debitod_title(){
			return "Debitor";
		}
		debitor_name(){
			return "";
		}
		Debitor(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.debitod_title()));
			(obj.content) = () => ([(this.debitor_name())]);
			return obj;
		}
		cons_items(){
			return [
				(this.Contract()), 
				(this.Pay_method()), 
				(this.Manager()), 
				(this.Debitor())
			];
		}
		Cons(){
			const obj = new this.$.$mol_row();
			(obj.title) = () => ((this.cons_title()));
			(obj.sub) = () => ((this.cons_items()));
			return obj;
		}
		Descr_deck(){
			const obj = new this.$.$mol_deck();
			(obj.items) = () => ([(this.Org()), (this.Cons())]);
			return obj;
		}
		Descr_card(){
			const obj = new this.$.$mol_card();
			(obj.Content) = () => ((this.Descr_deck()));
			return obj;
		}
		attach_title(){
			return "Attachments";
		}
		attachments(){
			return [];
		}
		attach_new(next){
			if(next !== undefined) return next;
			return null;
		}
		Attach(){
			const obj = new this.$.$mol_attach();
			(obj.items) = () => ((this.attachments()));
			(obj.attach_new) = (next) => ((this.attach_new(next)));
			return obj;
		}
		Attach_section(){
			const obj = new this.$.$mol_section();
			(obj.head) = () => ([(this.attach_title())]);
			(obj.content) = () => ([(this.Attach())]);
			return obj;
		}
		positions_title(){
			return "Positions";
		}
		cost(){
			const obj = new this.$.$mol_unit_money();
			(obj.valueOf) = () => (0);
			return obj;
		}
		Cost_value(){
			const obj = new this.$.$mol_cost();
			(obj.value) = () => ((this.cost()));
			return obj;
		}
		positions_head(){
			return [(this.positions_title()), (this.Cost_value())];
		}
		positions(){
			return [];
		}
		Positions(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.positions()));
			return obj;
		}
		Positions_section(){
			const obj = new this.$.$mol_section();
			(obj.head) = () => ((this.positions_head()));
			(obj.Content) = () => ((this.Positions()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Descr_card()), 
				(this.Attach_section()), 
				(this.Positions_section())
			]);
			return obj;
		}
		approved(next){
			if(next !== undefined) return next;
			return false;
		}
		approved_title(){
			return "Approved";
		}
		Approve(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.approved(next)));
			(obj.title) = () => ((this.approved_title()));
			return obj;
		}
		actions(){
			return [(this.Approve())];
		}
		position(id){
			return null;
		}
		supply(){
			return null;
		}
		title(){
			return "Supply";
		}
		tools(){
			return [(this.Close())];
		}
		body(){
			return [(this.Content())];
		}
		foot(){
			return (this.actions());
		}
		Position(id){
			const obj = new this.$.$mol_app_supplies_position();
			(obj.position) = () => ((this.position(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Close_icon"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Close"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Provider"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Consumer"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Supply_group"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Ballance_unit_item"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Org"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Contract"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Pay_method"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Manager"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Debitor"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Cons"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Descr_deck"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Descr_card"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "attach_new"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Attach"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Attach_section"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "cost"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Cost_value"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Positions"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Positions_section"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Content"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "approved"));
	($mol_mem(($.$mol_app_supplies_detail.prototype), "Approve"));
	($mol_mem_key(($.$mol_app_supplies_detail.prototype), "Position"));

//# sourceMappingURL=detail.view.tree.js.map