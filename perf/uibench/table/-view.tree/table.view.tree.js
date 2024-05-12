	($.$mol_perf_uibench_table) = class $mol_perf_uibench_table extends ($.$mol_list) {
		rows(){
			return [];
		}
		row_state(id){
			return null;
		}
		state(){
			return null;
		}
		dom_name(){
			return "table";
		}
		attr_static(){
			return {...(super.attr_static()), "class": "Table"};
		}
		sub(){
			return (this?.rows());
		}
		Row(id){
			const obj = new this.$.$mol_perf_uibench_table_row();
			(obj.state) = () => ((this?.row_state(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_perf_uibench_table.prototype), "Row"));
	($.$mol_perf_uibench_table_row) = class $mol_perf_uibench_table_row extends ($.$mol_view) {
		classes(){
			return "TableRow";
		}
		id(){
			return 0;
		}
		head_text(){
			return "";
		}
		Head(){
			const obj = new this.$.$mol_perf_uibench_table_cell();
			(obj.text) = () => ((this?.head_text()));
			return obj;
		}
		cells(){
			return [];
		}
		cell_state(id){
			return null;
		}
		state(){
			return null;
		}
		minimal_height(){
			return 18;
		}
		dom_name(){
			return "tr";
		}
		attr(){
			return {
				...(super.attr()), 
				"class": (this?.classes()), 
				"data-id": (this?.id())
			};
		}
		sub(){
			return [(this?.Head()), (this?.cells())];
		}
		Cell(id){
			const obj = new this.$.$mol_perf_uibench_table_cell();
			(obj.text) = () => ((this?.cell_state(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_perf_uibench_table_row.prototype), "Head"));
	($mol_mem_key(($.$mol_perf_uibench_table_row.prototype), "Cell"));
	($.$mol_perf_uibench_table_cell) = class $mol_perf_uibench_table_cell extends ($.$mol_view) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		text(){
			return "";
		}
		dom_name(){
			return "td";
		}
		attr_static(){
			return {...(super.attr_static()), "class": "TableCell"};
		}
		event(){
			return {...(super.event()), "click": (next) => (this?.click(next))};
		}
		sub(){
			return [(this?.text())];
		}
	};
	($mol_mem(($.$mol_perf_uibench_table_cell.prototype), "click"));

//# sourceMappingURL=table.view.tree.js.map