	($.$mol_view_tree2_to_js_test_ex_bidi_fallback_foo) = class $mol_view_tree2_to_js_test_ex_bidi_fallback_foo extends ($.$mol_object) {
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
		bar1(next){
			return (this?.bar2(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_fallback_foo.prototype), "bar2"));

//# sourceMappingURL=bidi_fallback.view.tree.js.map