	($.$mol_perf_jsfb) = class $mol_perf_jsfb extends ($.$mol_scroll) {
		title(){
			return "$mol keyed";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		create_1K(next){
			if(next !== undefined) return next;
			return null;
		}
		Create_1K(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("run");
			(obj.title) = () => ("Create 1,000 rows");
			(obj.click) = (next) => ((this.create_1K(next)));
			return obj;
		}
		create_10K(next){
			if(next !== undefined) return next;
			return null;
		}
		Create_10K(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("runlots");
			(obj.title) = () => ("Create 10,000 rows");
			(obj.click) = (next) => ((this.create_10K(next)));
			return obj;
		}
		append_1K(next){
			if(next !== undefined) return next;
			return null;
		}
		Append_1K(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("add");
			(obj.title) = () => ("Append 1,000 rows");
			(obj.click) = (next) => ((this.append_1K(next)));
			return obj;
		}
		update_10(next){
			if(next !== undefined) return next;
			return null;
		}
		Update_10(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("update");
			(obj.title) = () => ("Update every 10th row");
			(obj.click) = (next) => ((this.update_10(next)));
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Clear(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("clear");
			(obj.title) = () => ("Clear");
			(obj.click) = (next) => ((this.clear(next)));
			return obj;
		}
		swap(next){
			if(next !== undefined) return next;
			return null;
		}
		Swap(){
			const obj = new this.$.$mol_button_major();
			(obj.dom_id) = () => ("swaprows");
			(obj.title) = () => ("Swap Rows");
			(obj.click) = (next) => ((this.swap(next)));
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this.Create_1K()), 
				(this.Create_10K()), 
				(this.Append_1K()), 
				(this.Update_10()), 
				(this.Clear()), 
				(this.Swap())
			]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Title()), (this.Controls())]);
			return obj;
		}
		row_title(id, next){
			return (this.Row(id).title(next));
		}
		row_selected(id, next){
			if(next !== undefined) return next;
			return false;
		}
		row_drop(id, next){
			if(next !== undefined) return next;
			return null;
		}
		row_id(id){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_perf_jsfb_row();
			(obj.selected) = (next) => ((this.row_selected(id, next)));
			(obj.drop) = (next) => ((this.row_drop(id, next)));
			(obj.id) = () => ((this.row_id(id)));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Head()), (this.Rows())]);
			return obj;
		}
		sub(){
			return [(this.Content())];
		}
	};
	($mol_mem(($.$mol_perf_jsfb.prototype), "Title"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "create_1K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Create_1K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "create_10K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Create_10K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "append_1K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Append_1K"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "update_10"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Update_10"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "clear"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Clear"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "swap"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Swap"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Controls"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Head"));
	($mol_mem_key(($.$mol_perf_jsfb.prototype), "row_selected"));
	($mol_mem_key(($.$mol_perf_jsfb.prototype), "row_drop"));
	($mol_mem_key(($.$mol_perf_jsfb.prototype), "Row"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Rows"));
	($mol_mem(($.$mol_perf_jsfb.prototype), "Content"));
	($.$mol_perf_jsfb_row) = class $mol_perf_jsfb_row extends ($.$mol_view) {
		id(){
			return "";
		}
		Id(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.id())]);
			return obj;
		}
		selected(next){
			if(next !== undefined) return next;
			return false;
		}
		title(next){
			if(next !== undefined) return next;
			return "";
		}
		Title(){
			const obj = new this.$.$mol_check();
			(obj.checked) = (next) => ((this.selected(next)));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Drop_icon(){
			const obj = new this.$.$mol_icon_cross();
			return obj;
		}
		drop(next){
			if(next !== undefined) return next;
			return null;
		}
		Drop(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Drop_icon())]);
			(obj.click) = (next) => ((this.drop(next)));
			return obj;
		}
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 200;
		}
		attr(){
			return {...(super.attr()), "mol_perf_jsfb_row_selected": (this.selected())};
		}
		sub(){
			return [
				(this.Id()), 
				(this.Title()), 
				(this.Drop())
			];
		}
	};
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "Id"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "selected"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "title"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "Title"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "Drop_icon"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "drop"));
	($mol_mem(($.$mol_perf_jsfb_row.prototype), "Drop"));

//# sourceMappingURL=jsfb.view.tree.js.map