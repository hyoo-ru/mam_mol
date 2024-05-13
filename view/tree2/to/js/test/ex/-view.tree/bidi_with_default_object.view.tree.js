	($.$mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo) = class $mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo extends ($.$mol_object) {
		owner(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_object();
			return obj;
		}
		class(next){
			return (this?.owner(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo.prototype), "owner"));

//# sourceMappingURL=bidi_with_default_object.view.tree.js.map