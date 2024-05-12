	($.$mol_perf_uibench) = class $mol_perf_uibench extends ($.$mol_scroll) {
		table_state(){
			return null;
		}
		Table(){
			const obj = new this.$.$mol_perf_uibench_table();
			(obj.state) = () => ((this?.table_state()));
			return obj;
		}
		anim_state(){
			return null;
		}
		Anim(){
			const obj = new this.$.$mol_perf_uibench_anim();
			(obj.state) = () => ((this?.anim_state()));
			return obj;
		}
		tree_state(){
			return null;
		}
		Tree(){
			const obj = new this.$.$mol_perf_uibench_tree();
			(obj.state) = () => ((this?.tree_state()));
			return obj;
		}
		attr_static(){
			return {...(super.attr_static()), "class": "Main"};
		}
		sub(){
			return [
				(this?.Table()), 
				(this?.Anim()), 
				(this?.Tree())
			];
		}
	};
	($mol_mem(($.$mol_perf_uibench.prototype), "Table"));
	($mol_mem(($.$mol_perf_uibench.prototype), "Anim"));
	($mol_mem(($.$mol_perf_uibench.prototype), "Tree"));

//# sourceMappingURL=uibench.view.tree.js.map