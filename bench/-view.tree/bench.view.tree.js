	($.$mol_bench) = class $mol_bench extends ($.$mol_grid) {
		result(){
			return {};
		}
		event_sort_toggle(id, next){
			if(next !== undefined) return next;
			return null;
		}
		col_head_title(id){
			return "";
		}
		Col_head_sort(id){
			const obj = new this.$.$mol_icon_sort_asc();
			return obj;
		}
		col_head_content(id){
			return [(this.col_head_title(id)), (this.Col_head_sort(id))];
		}
		result_value(id){
			return "";
		}
		result_portion(id){
			return 0;
		}
		Result_portion(id){
			const obj = new this.$.$mol_portion();
			(obj.portion) = () => ((this.result_portion(id)));
			return obj;
		}
		records(){
			return (this.result());
		}
		col_sort(next){
			if(next !== undefined) return next;
			return "";
		}
		Col_head(id){
			const obj = new this.$.$mol_bench_head();
			(obj.event_click) = (next) => ((this.event_sort_toggle(id, next)));
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		cell_content_number(id){
			return [(this.result_value(id)), (this.Result_portion(id))];
		}
	};
	($mol_mem_key(($.$mol_bench.prototype), "event_sort_toggle"));
	($mol_mem_key(($.$mol_bench.prototype), "Col_head_sort"));
	($mol_mem_key(($.$mol_bench.prototype), "Result_portion"));
	($mol_mem(($.$mol_bench.prototype), "col_sort"));
	($mol_mem_key(($.$mol_bench.prototype), "Col_head"));
	($.$mol_bench_head) = class $mol_bench_head extends ($.$mol_float) {
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_bench_head_hint"));
		}
		horizontal(){
			return false;
		}
		event(){
			return {...(super.event()), "click": (next) => (this.event_click(next))};
		}
		attr(){
			return {...(super.attr()), "title": (this.hint())};
		}
	};
	($mol_mem(($.$mol_bench_head.prototype), "event_click"));

//# sourceMappingURL=bench.view.tree.js.map