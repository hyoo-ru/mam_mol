	($.$mol_perf_uibench_tree) = class $mol_perf_uibench_tree extends ($.$mol_view) {
		root_state(){
			return null;
		}
		Root(){
			const obj = new this.$.$mol_perf_uibench_tree_branch();
			(obj.state) = () => ((this.root_state()));
			return obj;
		}
		state(){
			return null;
		}
		attr_static(){
			return {...(super.attr_static()), "class": "Tree"};
		}
		sub(){
			return [(this.Root())];
		}
	};
	($mol_mem(($.$mol_perf_uibench_tree.prototype), "Root"));
	($.$mol_perf_uibench_tree_branch) = class $mol_perf_uibench_tree_branch extends ($.$mol_list) {
		branch_state(id){
			return null;
		}
		leaf_state(id){
			return null;
		}
		state(){
			return null;
		}
		dom_name(){
			return "ul";
		}
		attr_static(){
			return {...(super.attr_static()), "class": "TreeNode"};
		}
		Branch(id){
			const obj = new this.$.$mol_perf_uibench_tree_branch();
			(obj.state) = () => ((this.branch_state(id)));
			return obj;
		}
		Leaf(id){
			const obj = new this.$.$mol_perf_uibench_tree_leaf();
			(obj.text) = () => ((this.leaf_state(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_perf_uibench_tree_branch.prototype), "Branch"));
	($mol_mem_key(($.$mol_perf_uibench_tree_branch.prototype), "Leaf"));
	($.$mol_perf_uibench_tree_leaf) = class $mol_perf_uibench_tree_leaf extends ($.$mol_view) {
		text(){
			return "";
		}
		minimal_height(){
			return 26;
		}
		dom_name(){
			return "li";
		}
		attr_static(){
			return {...(super.attr_static()), "class": "TreeLeaf"};
		}
		sub(){
			return [(this.text())];
		}
	};

//# sourceMappingURL=tree.view.tree.js.map