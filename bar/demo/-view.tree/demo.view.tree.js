	($.$mol_bar_demo) = class $mol_bar_demo extends ($.$mol_example_small) {
		mail_hint(){
			return "E-mail";
		}
		mail(next){
			if(next !== undefined) return next;
			return "";
		}
		Two_mail(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this?.mail_hint()));
			(obj.value) = (next) => ((this?.mail(next)));
			return obj;
		}
		submit_title(){
			return "Submit";
		}
		Two_submit(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.submit_title()));
			return obj;
		}
		Two(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this?.Two_mail()), (this?.Two_submit())]);
			return obj;
		}
		Three_mail(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this?.mail_hint()));
			(obj.value) = (next) => ((this?.mail(next)));
			return obj;
		}
		confirm_title(){
			return "Confirm";
		}
		confirmed(next){
			if(next !== undefined) return next;
			return false;
		}
		Three_confirm(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this?.confirm_title()));
			(obj.checked) = (next) => ((this?.confirmed(next)));
			return obj;
		}
		Three(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this?.Three_mail()), (this?.Three_confirm())]);
			return obj;
		}
		title(){
			return "Group of controls as one control";
		}
		sub(){
			return [(this?.Two()), (this?.Three())];
		}
		tags(){
			return ["group", "container"];
		}
		aspects(){
			return ["Widget/Layout", "Widget/Island"];
		}
	};
	($mol_mem(($.$mol_bar_demo.prototype), "mail"));
	($mol_mem(($.$mol_bar_demo.prototype), "Two_mail"));
	($mol_mem(($.$mol_bar_demo.prototype), "Two_submit"));
	($mol_mem(($.$mol_bar_demo.prototype), "Two"));
	($mol_mem(($.$mol_bar_demo.prototype), "Three_mail"));
	($mol_mem(($.$mol_bar_demo.prototype), "confirmed"));
	($mol_mem(($.$mol_bar_demo.prototype), "Three_confirm"));
	($mol_mem(($.$mol_bar_demo.prototype), "Three"));

//# sourceMappingURL=demo.view.tree.js.map