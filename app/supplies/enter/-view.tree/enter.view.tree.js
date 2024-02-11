	($.$mol_app_supplies_enter) = class $mol_app_supplies_enter extends ($.$mol_view) {
		entered(next){
			if(next !== undefined) return next;
			return false;
		}
		minimal_width(){
			return 400;
		}
		sub(){
			return [(this.form())];
		}
		loginLabel(){
			return "User name";
		}
		login(next){
			if(next !== undefined) return next;
			return "";
		}
		loginControl(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.login(next)));
			return obj;
		}
		loginField(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.loginLabel()));
			(obj.control) = () => ((this.loginControl()));
			return obj;
		}
		passwordLabel(){
			return "Pass word";
		}
		password(next){
			if(next !== undefined) return next;
			return "";
		}
		passControl(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.password(next)));
			(obj.type) = () => ("password");
			return obj;
		}
		passwordField(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.passwordLabel()));
			(obj.control) = () => ((this.passControl()));
			return obj;
		}
		submitLabel(){
			return "Log In";
		}
		event_submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_blocked(){
			return false;
		}
		submit(){
			const obj = new this.$.$mol_button_major();
			(obj.sub) = () => ([(this.submitLabel())]);
			(obj.click) = (next) => ((this.event_submit(next)));
			(obj.disabled) = () => ((this.submit_blocked()));
			return obj;
		}
		form(){
			const obj = new this.$.$mol_form();
			(obj.form_fields) = () => ([(this.loginField()), (this.passwordField())]);
			(obj.buttons) = () => ([(this.submit())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_supplies_enter.prototype), "entered"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "login"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "loginControl"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "loginField"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "password"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "passControl"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "passwordField"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "event_submit"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "submit"));
	($mol_mem(($.$mol_app_supplies_enter.prototype), "form"));

//# sourceMappingURL=enter.view.tree.js.map