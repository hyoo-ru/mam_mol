	($.$mol_perf_dbmon) = class $mol_perf_dbmon extends ($.$mol_scroll) {
		databases(){
			return [];
		}
		Databases(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.databases()));
			return obj;
		}
		name(id){
			return "";
		}
		Name(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.name(id))]);
			return obj;
		}
		query_count_label_mod(id){
			return "";
		}
		query_count(id){
			return 0;
		}
		Query_count(id){
			const obj = new this.$.$mol_perf_dbmon_query_count();
			(obj.label_mod) = () => ((this.query_count_label_mod(id)));
			(obj.count) = () => ((this.query_count(id)));
			return obj;
		}
		top_queries(id){
			return [];
		}
		database(id){
			return [
				(this.Name(id)), 
				(this.Query_count(id)), 
				(this.top_queries(id))
			];
		}
		query_elapsed(id){
			return "";
		}
		query_elapsed_mod(id){
			return "";
		}
		query_value(id){
			return "";
		}
		title(){
			return "dbmon ($mol)";
		}
		sub(){
			return [(this.Databases())];
		}
		Database(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.database(id)));
			return obj;
		}
		Query(id){
			const obj = new this.$.$mol_perf_dbmon_query();
			(obj.elapsed) = () => ((this.query_elapsed(id)));
			(obj.elapsed_mod) = () => ((this.query_elapsed_mod(id)));
			(obj.value) = () => ((this.query_value(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_perf_dbmon.prototype), "Databases"));
	($mol_mem_key(($.$mol_perf_dbmon.prototype), "Name"));
	($mol_mem_key(($.$mol_perf_dbmon.prototype), "Query_count"));
	($mol_mem_key(($.$mol_perf_dbmon.prototype), "Database"));
	($mol_mem_key(($.$mol_perf_dbmon.prototype), "Query"));
	($.$mol_perf_dbmon_query_count) = class $mol_perf_dbmon_query_count extends ($.$mol_view) {
		label_mod(){
			return "";
		}
		count(){
			return 0;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({"mol_perf_dbmon_query_count_label": (this.label_mod())});
			(obj.sub) = () => ([(this.count())]);
			return obj;
		}
		sub(){
			return [(this.Label())];
		}
	};
	($mol_mem(($.$mol_perf_dbmon_query_count.prototype), "Label"));
	($.$mol_perf_dbmon_query) = class $mol_perf_dbmon_query extends ($.$mol_pop_over) {
		elapsed_mod(){
			return "";
		}
		elapsed(){
			return "";
		}
		Elapsed(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({"mol_perf_dbmon_query_elapsed": (this.elapsed_mod())});
			(obj.sub) = () => ([(this.elapsed())]);
			return obj;
		}
		value(){
			return "";
		}
		minimal_height(){
			return 40;
		}
		Anchor(){
			return (this.Elapsed());
		}
		bubble_content(){
			return [(this.value())];
		}
		align(){
			return "left_center";
		}
	};
	($mol_mem(($.$mol_perf_dbmon_query.prototype), "Elapsed"));

//# sourceMappingURL=dbmon.view.tree.js.map