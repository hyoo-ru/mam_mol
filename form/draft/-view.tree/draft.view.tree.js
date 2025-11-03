	($.$mol_form_draft) = class $mol_form_draft extends ($.$mol_form) {
		reset_title(){
			return (this.$.$mol_locale.text("$mol_form_draft_reset_title"));
		}
		Reset_icon(){
			const obj = new this.$.$mol_icon_restore();
			return obj;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.reset_title()));
			(obj.sub) = () => ([(this.Reset_icon())]);
			(obj.click) = (next) => ((this.reset(next)));
			return obj;
		}
		model(){
			const obj = new this.$.$mol_object2();
			return obj;
		}
		model_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		changed(){
			return false;
		}
		state(){
			return {};
		}
		state_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		value(id, next){
			if(next !== undefined) return next;
			return null;
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
		done(next){
			if(next !== undefined) return next;
			return null;
		}
		buttons(){
			return [(this.Submit()), (this.Reset())];
		}
	};
	($mol_mem(($.$mol_form_draft.prototype), "Reset_icon"));
	($mol_mem(($.$mol_form_draft.prototype), "Reset"));
	($mol_mem(($.$mol_form_draft.prototype), "model"));
	($mol_mem_key(($.$mol_form_draft.prototype), "model_pick"));
	($mol_mem_key(($.$mol_form_draft.prototype), "state_pick"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_str"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_number"));
	($mol_mem_key(($.$mol_form_draft.prototype), "dictionary_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "list_string"));
	($mol_mem(($.$mol_form_draft.prototype), "reset"));
	($mol_mem(($.$mol_form_draft.prototype), "done"));

//# sourceMappingURL=draft.view.tree.js.map