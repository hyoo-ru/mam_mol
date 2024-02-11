	($.$mol_view_tree2_to_js_test_ex_left_read_only_foo) = class $mol_view_tree2_to_js_test_ex_left_read_only_foo extends ($.$mol_object) {
		bar1(){
			return (this.bar2());
		}
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_read_only_foo.prototype), "bar2"));

//# sourceMappingURL=left_read_only.view.tree.js.map