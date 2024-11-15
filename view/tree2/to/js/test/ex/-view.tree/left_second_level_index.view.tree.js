	($.$mol_view_tree2_to_js_test_ex_left_second_level_index_bar) = class $mol_view_tree2_to_js_test_ex_left_second_level_index_bar extends ($.$mol_object) {
		localized(){
			return "";
		}
	};
	($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo) = class $mol_view_tree2_to_js_test_ex_left_second_level_index_foo extends ($.$mol_object) {
		some(id, next){
			if(next !== undefined) return next;
			return (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_left_second_level_index_foo_some"));
		}
		owner(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_left_second_level_index_bar();
			(obj.localized) = () => ((this.some(id)));
			return obj;
		}
		cls(id){
			return (this.owner(id));
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo.prototype), "some"));
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo.prototype), "owner"));

//# sourceMappingURL=left_second_level_index.view.tree.js.map