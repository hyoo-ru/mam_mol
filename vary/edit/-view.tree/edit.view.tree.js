	($.$mol_vary_edit) = class $mol_vary_edit extends ($.$mol_list) {
		Type_icon(id){
			const obj = new this.$.$mol_icon();
			return obj;
		}
		enabled(){
			return true;
		}
		type_mutable(){
			return (this.enabled());
		}
		type(next){
			if(next !== undefined) return next;
			return "Null";
		}
		Type(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.Trigger_icon) = () => (null);
			(obj.option_content) = (id) => ([(this.Type_icon(id))]);
			(obj.enabled) = () => ((this.type_mutable()));
			(obj.dictionary) = () => ({
				"Null": "Nothing", 
				"Bool": "Boolean", 
				"Bint": "Integer", 
				"Real": "Real", 
				"Text": "Text", 
				"List": "Array", 
				"Tupl": "Dictionary"
			});
			(obj.value) = (next) => ((this.type(next)));
			return obj;
		}
		bool(next){
			if(next !== undefined) return next;
			return false;
		}
		Bool(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.bool(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		bint(next){
			if(next !== undefined) return next;
			return 0n;
		}
		text_selection(next){
			if(next !== undefined) return next;
			return [];
		}
		Bint(){
			const obj = new this.$.$mol_bigint_field();
			(obj.value) = (next) => ((this.bint(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		real(next){
			if(next !== undefined) return next;
			return 0;
		}
		Real(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.real(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		date(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		Date(){
			const obj = new this.$.$mol_date();
			(obj.value_moment) = (next) => ((this.date(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		text(next){
			if(next !== undefined) return next;
			return "";
		}
		Text(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.text(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		item_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Item_add_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Item_add(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.item_add(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.sub) = () => ([(this.Item_add_icon())]);
			return obj;
		}
		field_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Field_add_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Field_add(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("+");
			(obj.submit) = (next) => ((this.field_add(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.sub) = () => ([(this.Field_add_icon())]);
			return obj;
		}
		head(){
			return [
				(this.Bool()), 
				(this.Bint()), 
				(this.Real()), 
				(this.Date()), 
				(this.Text()), 
				(this.Item_add()), 
				(this.Field_add())
			];
		}
		Head(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this.Type()), ...(this.head())]);
			return obj;
		}
		item_key(id){
			return null;
		}
		Item_key(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.item_key(id))]);
			return obj;
		}
		Item_drag(id){
			const obj = new this.$.$mol_drag();
			(obj.Sub) = () => ((this.Item_key(id)));
			return obj;
		}
		Item_drop(id){
			const obj = new this.$.$mol_drop();
			(obj.Sub) = () => ((this.Item_drag(id)));
			return obj;
		}
		item_val(id, next){
			if(next !== undefined) return next;
			return null;
		}
		item_selection(id, next){
			if(next !== undefined) return next;
			return [];
		}
		Item_val(id){
			const obj = new this.$.$mol_vary_edit();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.item_val(id, next)));
			(obj.selection) = (next) => ((this.item_selection(id, next)));
			return obj;
		}
		Item(id){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this.Item_drop(id)), (this.Item_val(id))]);
			return obj;
		}
		body(){
			return [(this.Item("0"))];
		}
		Body(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.body()));
			return obj;
		}
		schema(){
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return null;
		}
		Vary(){
			const obj = new this.$.$mol_vary_class();
			return obj;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		Null_icon(){
			const obj = new this.$.$mol_icon_circle_off_outline();
			return obj;
		}
		Bool_icon(){
			const obj = new this.$.$mol_icon_flag_checkered();
			return obj;
		}
		Bint_icon(){
			const obj = new this.$.$mol_icon_numeric();
			return obj;
		}
		Real_icon(){
			const obj = new this.$.$mol_icon_division();
			return obj;
		}
		Date_icon(){
			const obj = new this.$.$mol_icon_clock_outline();
			return obj;
		}
		Text_icon(){
			const obj = new this.$.$mol_icon_alphabetical_variant();
			return obj;
		}
		List_icon(){
			const obj = new this.$.$mol_icon_format_list_bulleted();
			return obj;
		}
		Tupl_icon(){
			const obj = new this.$.$mol_icon_table();
			return obj;
		}
		rows(){
			return [(this.Head()), (this.Body())];
		}
	};
	($mol_mem_key(($.$mol_vary_edit.prototype), "Type_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "type"));
	($mol_mem(($.$mol_vary_edit.prototype), "Type"));
	($mol_mem(($.$mol_vary_edit.prototype), "bool"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bool"));
	($mol_mem(($.$mol_vary_edit.prototype), "bint"));
	($mol_mem(($.$mol_vary_edit.prototype), "text_selection"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bint"));
	($mol_mem(($.$mol_vary_edit.prototype), "real"));
	($mol_mem(($.$mol_vary_edit.prototype), "Real"));
	($mol_mem(($.$mol_vary_edit.prototype), "date"));
	($mol_mem(($.$mol_vary_edit.prototype), "Date"));
	($mol_mem(($.$mol_vary_edit.prototype), "text"));
	($mol_mem(($.$mol_vary_edit.prototype), "Text"));
	($mol_mem(($.$mol_vary_edit.prototype), "item_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Item_add_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Item_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "field_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Field_add_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Field_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Head"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_key"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_drag"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_drop"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_val"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_selection"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_val"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item"));
	($mol_mem(($.$mol_vary_edit.prototype), "Body"));
	($mol_mem(($.$mol_vary_edit.prototype), "value"));
	($mol_mem(($.$mol_vary_edit.prototype), "Vary"));
	($mol_mem(($.$mol_vary_edit.prototype), "selection"));
	($mol_mem(($.$mol_vary_edit.prototype), "Null_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bool_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bint_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Real_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Date_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Text_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "List_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Tupl_icon"));

//# sourceMappingURL=edit.view.tree.js.map