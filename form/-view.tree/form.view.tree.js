	($.$mol_form) = class $mol_form extends ($.$mol_list) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		form_fields(){
			return [];
		}
		body(){
			return (this.form_fields());
		}
		Body(){
			const obj = new this.$.$mol_list();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		submit_title(){
			return (this.$.$mol_locale.text("$mol_form_submit_title"));
		}
		submit_hint(){
			return "";
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ((this.submit_title()));
			(obj.hint) = () => ((this.submit_hint()));
			(obj.click) = (next) => ((this.submit(next)));
			return obj;
		}
		result(next){
			if(next !== undefined) return next;
			return null;
		}
		Result(){
			const obj = new this.$.$mol_status();
			(obj.message) = () => ((this.result()));
			return obj;
		}
		buttons(){
			return [(this.Submit()), (this.Result())];
		}
		foot(){
			return (this.buttons());
		}
		Foot(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		submit_allowed(){
			return true;
		}
		submit_blocked(){
			return false;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		save(next){
			if(next !== undefined) return next;
			return null;
		}
		message_done(){
			return (this.$.$mol_locale.text("$mol_form_message_done"));
		}
		message_invalid(){
			return (this.$.$mol_locale.text("$mol_form_message_invalid"));
		}
		rows(){
			return [(this.Body()), (this.Foot())];
		}
	};
	($mol_mem(($.$mol_form.prototype), "keydown"));
	($mol_mem(($.$mol_form.prototype), "Body"));
	($mol_mem(($.$mol_form.prototype), "submit"));
	($mol_mem(($.$mol_form.prototype), "Submit"));
	($mol_mem(($.$mol_form.prototype), "result"));
	($mol_mem(($.$mol_form.prototype), "Result"));
	($mol_mem(($.$mol_form.prototype), "Foot"));
	($mol_mem(($.$mol_form.prototype), "save"));

//# sourceMappingURL=form.view.tree.js.map