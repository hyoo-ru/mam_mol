	($.$mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo) = class $mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo extends ($.$mol_object) {
		text(){
			return "123";
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_klass_tuple([(this?.text())], {"type": "text/plain"});
			return obj;
		}
		blobs(){
			return [(this?.text_blob())];
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo.prototype), "text_blob"));

//# sourceMappingURL=array_constructor_tuple.view.tree.js.map