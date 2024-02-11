	($.$mol_app_report) = class $mol_app_report extends ($.$mol_page) {
		title(){
			return (this.$.$mol_locale.text("$mol_app_report_title"));
		}
		body(){
			return [(this.descriptor()), (this.tabler())];
		}
		rower(id){
			const obj = new this.$.$mol_app_report_rower();
			(obj.cells) = () => ((this.rowerCells(id)));
			return obj;
		}
		cell(id){
			const obj = new this.$.$mol_app_report_cell();
			(obj.content) = () => ((this.cell_content(id)));
			(obj.rows) = () => ((this.cellrows(id)));
			(obj.cols) = () => ((this.cellCols(id)));
			return obj;
		}
		texter(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.cell_value(id))]);
			return obj;
		}
		select(id){
			const obj = new this.$.$mol_select();
			(obj.value) = (next) => ((this.cell_value(id, next)));
			(obj.dictionary) = () => ((this.cell_options(id)));
			return obj;
		}
		number(id){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.cell_value(id, next)));
			return obj;
		}
		description(){
			return "";
		}
		descriptor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		headCells(){
			return [];
		}
		headRower(){
			const obj = new this.$.$mol_app_report_rower();
			(obj.cells) = () => ((this.headCells()));
			return obj;
		}
		rows(){
			return [(this.headRower())];
		}
		tabler(){
			const obj = new this.$.$mol_app_report_tabler();
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		rowerCells(id){
			return [];
		}
		cell_content(id){
			return null;
		}
		cellrows(id){
			return 1;
		}
		cellCols(id){
			return 1;
		}
		cell_value(id, next){
			if(next !== undefined) return next;
			return null;
		}
		cell_options(id){
			return {};
		}
	};
	($mol_mem_key(($.$mol_app_report.prototype), "rower"));
	($mol_mem_key(($.$mol_app_report.prototype), "cell"));
	($mol_mem_key(($.$mol_app_report.prototype), "texter"));
	($mol_mem_key(($.$mol_app_report.prototype), "select"));
	($mol_mem_key(($.$mol_app_report.prototype), "number"));
	($mol_mem(($.$mol_app_report.prototype), "descriptor"));
	($mol_mem(($.$mol_app_report.prototype), "headRower"));
	($mol_mem(($.$mol_app_report.prototype), "tabler"));
	($mol_mem_key(($.$mol_app_report.prototype), "cell_value"));
	($.$mol_app_report_tabler) = class $mol_app_report_tabler extends ($.$mol_view) {
		dom_name(){
			return "table";
		}
		sub(){
			return (this.rows());
		}
		rows(){
			return [];
		}
	};
	($.$mol_app_report_rower) = class $mol_app_report_rower extends ($.$mol_view) {
		dom_name(){
			return "tr";
		}
		sub(){
			return (this.cells());
		}
		cells(){
			return [];
		}
	};
	($.$mol_app_report_cell) = class $mol_app_report_cell extends ($.$mol_view) {
		dom_name(){
			return "td";
		}
		attr(){
			return {
				...(super.attr()), 
				"colspan": (this.cols()), 
				"rowspan": (this.rows())
			};
		}
		sub(){
			return [(this.content())];
		}
		cols(){
			return 1;
		}
		rows(){
			return 1;
		}
		content(){
			return null;
		}
	};

//# sourceMappingURL=report.view.tree.js.map