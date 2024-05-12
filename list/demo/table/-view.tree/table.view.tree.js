	($.$mol_list_demo_table) = class $mol_list_demo_table extends ($.$mol_example) {
		check_list(){
			return [];
		}
		Check(){
			const obj = new this.$.$mol_check_group();
			(obj.checks) = () => ((this?.check_list()));
			(obj.title) = () => ("Good Goods");
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Check())]);
			return obj;
		}
		row_id(id, next){
			if(next !== undefined) return next;
			return "0000";
		}
		row_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		Id(id){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this?.row_id(id)));
			(obj.checked) = (next) => ((this?.row_checked(id, next)));
			return obj;
		}
		Id_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("ID");
			(obj.Content) = () => ((this?.Id(id)));
			return obj;
		}
		row_uri(id){
			return "";
		}
		row_title(id){
			return "";
		}
		Title(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this?.row_uri(id)));
			(obj.title) = () => ((this?.row_title(id)));
			return obj;
		}
		Title_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Product Name");
			(obj.Content) = () => ((this?.Title(id)));
			return obj;
		}
		row_color(id, next){
			if(next !== undefined) return next;
			return "";
		}
		colors(){
			return [];
		}
		Color(id){
			const obj = new this.$.$mol_select();
			(obj.value) = (next) => ((this?.row_color(id, next)));
			(obj.options) = () => ((this?.colors()));
			return obj;
		}
		Color_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Color");
			(obj.Content) = () => ((this?.Color(id)));
			return obj;
		}
		row_status(id, next){
			if(next !== undefined) return next;
			return "";
		}
		status_options(){
			return {
				"minor": "Store", 
				"major": "Sale", 
				"critical": "Support"
			};
		}
		Status(id){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.row_status(id, next)));
			(obj.options) = () => ((this?.status_options()));
			return obj;
		}
		Status_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Status");
			(obj.Content) = () => ((this?.Status(id)));
			return obj;
		}
		row_quantity(id, next){
			if(next !== undefined) return next;
			return 0;
		}
		Quantity(id){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this?.row_quantity(id, next)));
			return obj;
		}
		Quantity_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Quantity");
			(obj.Content) = () => ((this?.Quantity(id)));
			return obj;
		}
		row_moment(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		Date(id){
			const obj = new this.$.$mol_date();
			(obj.value_moment) = (next) => ((this?.row_moment(id, next)));
			return obj;
		}
		Date_labeler(id){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Supply Time");
			(obj.Content) = () => ((this?.Date(id)));
			return obj;
		}
		row_content(id){
			return [
				(this?.Id_labeler(id)), 
				(this?.Title_labeler(id)), 
				(this?.Color_labeler(id)), 
				(this?.Status_labeler(id)), 
				(this?.Quantity_labeler(id)), 
				(this?.Date_labeler(id))
			];
		}
		Row(id){
			const obj = new this.$.$mol_row();
			(obj.minimal_height) = () => (100);
			(obj.minimal_width) = () => (200);
			(obj.sub) = () => ((this?.row_content(id)));
			return obj;
		}
		rows(){
			return [(this?.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this?.rows()));
			return obj;
		}
		title(){
			return "Large list of rows with dynamic content";
		}
		count(){
			return 9999;
		}
		sub(){
			return [(this?.Head()), (this?.Rows())];
		}
		tags(){
			return [
				"list", 
				"table", 
				"scroll", 
				"divider", 
				"grid"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_list_demo_table.prototype), "Check"));
	($mol_mem(($.$mol_list_demo_table.prototype), "Head"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_id"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_checked"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Id"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Id_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Title"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Title_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_color"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Color"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Color_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_status"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Status"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Status_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_quantity"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Quantity"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Quantity_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "row_moment"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Date"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Date_labeler"));
	($mol_mem_key(($.$mol_list_demo_table.prototype), "Row"));
	($mol_mem(($.$mol_list_demo_table.prototype), "Rows"));

//# sourceMappingURL=table.view.tree.js.map