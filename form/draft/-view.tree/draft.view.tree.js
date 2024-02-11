	($.$mol_form_draft) = class $mol_form_draft extends ($.$mol_form) {
		model(){
			const obj = new this.$.$mol_object2();
			return obj;
		}
		changed(){
			return false;
		}
		value_str(id, next){
			if(next !== undefined) return next;
			return "";
		}
		value_bool(id, next){
			if(next !== undefined) return next;
			return false;
		}
		value_number(id, next){
			if(next !== undefined) return next;
			return 0;
		}
		dictionary_bool(id, next){
			if(next !== undefined) return next;
			return {};
		}
		list_string(id, next){
			if(next !== undefined) return next;
			return [];
		}
		value_changed(id){
			return false;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_form_draft.prototype), "model"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_str"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_number"));
	($mol_mem_key(($.$mol_form_draft.prototype), "dictionary_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "list_string"));
	($mol_mem(($.$mol_form_draft.prototype), "reset"));

//# sourceMappingURL=draft.view.tree.js.map