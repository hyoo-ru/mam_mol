	($.$mol_bench_demo) = class $mol_bench_demo extends ($.$mol_example_small) {
		title(){
			return "Benchmarking results visualization";
		}
		sub(){
			return [(this.View())];
		}
		tags(){
			return ["perfomance", "comparison"];
		}
		aspects(){
			return ["Widget/Grid"];
		}
		col_sort(next){
			if(next !== undefined) return next;
			return "mid";
		}
		result(){
			return {};
		}
		View(){
			const obj = new this.$.$mol_bench();
			(obj.col_sort) = (next) => ((this.col_sort(next)));
			(obj.result) = () => ((this.result()));
			return obj;
		}
	};
	($mol_mem(($.$mol_bench_demo.prototype), "col_sort"));
	($mol_mem(($.$mol_bench_demo.prototype), "View"));

//# sourceMappingURL=demo.view.tree.js.map