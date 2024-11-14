	($.$mol_form_demo) = class $mol_form_demo extends ($.$mol_example) {
		avatars_bid(){
			return "";
		}
		avatars(next){
			if(next !== undefined) return next;
			return [];
		}
		Avatars_control(){
			const obj = new this.$.$mol_attach();
			(obj.items) = (next) => ((this.avatars(next)));
			return obj;
		}
		Avatars_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Avatars");
			(obj.bid) = () => ((this.avatars_bid()));
			(obj.Content) = () => ((this.Avatars_control()));
			return obj;
		}
		name_first_bid(){
			return "";
		}
		name_first(next){
			if(next !== undefined) return next;
			return "";
		}
		Name_first_control(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Jack");
			(obj.value) = (next) => ((this.name_first(next)));
			return obj;
		}
		Name_first_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("First Name");
			(obj.bid) = () => ((this.name_first_bid()));
			(obj.Content) = () => ((this.Name_first_control()));
			return obj;
		}
		name_nick_bid(){
			return "";
		}
		name_nick(next){
			if(next !== undefined) return next;
			return "";
		}
		Name_nick_control(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Capitan");
			(obj.value) = (next) => ((this.name_nick(next)));
			return obj;
		}
		Name_nick_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Nick Name");
			(obj.bid) = () => ((this.name_nick_bid()));
			(obj.Content) = () => ((this.Name_nick_control()));
			return obj;
		}
		name_second_bid(){
			return "";
		}
		name_second(next){
			if(next !== undefined) return next;
			return "";
		}
		Name_second_control(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Sparrow");
			(obj.value) = (next) => ((this.name_second(next)));
			return obj;
		}
		Name_second_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Second Name");
			(obj.bid) = () => ((this.name_second_bid()));
			(obj.Content) = () => ((this.Name_second_control()));
			return obj;
		}
		Names(){
			const obj = new this.$.$mol_form_group();
			(obj.sub) = () => ([
				(this.Name_first_field()), 
				(this.Name_nick_field()), 
				(this.Name_second_field())
			]);
			return obj;
		}
		age_bid(){
			return "";
		}
		age(next){
			if(next !== undefined) return next;
			return 0;
		}
		Age_control(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.age(next)));
			return obj;
		}
		Age_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Age");
			(obj.bid) = () => ((this.age_bid()));
			(obj.Content) = () => ((this.Age_control()));
			return obj;
		}
		sex_label(){
			return "Sex";
		}
		sex_bid(){
			return "";
		}
		sex(next){
			if(next !== undefined) return next;
			return "";
		}
		sex_options(){
			return {
				"male": "Male", 
				"intersex": "Intersex", 
				"female": "Female"
			};
		}
		Sex_control(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.sex(next)));
			(obj.options) = () => ((this.sex_options()));
			return obj;
		}
		Sex_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.sex_label()));
			(obj.bid) = () => ((this.sex_bid()));
			(obj.Content) = () => ((this.Sex_control()));
			return obj;
		}
		color_bid(){
			return "";
		}
		color(next){
			if(next !== undefined) return next;
			return "";
		}
		Color_control(){
			const obj = new this.$.$mol_select();
			(obj.value) = (next) => ((this.color(next)));
			(obj.dictionary) = () => ({
				"": "❔", 
				"white": "⬜ White", 
				"yellow": "🟨 Yellow", 
				"brown": "🟫 Brown", 
				"red": "🟥 Red"
			});
			return obj;
		}
		Color_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Skin color");
			(obj.bid) = () => ((this.color_bid()));
			(obj.Content) = () => ((this.Color_control()));
			return obj;
		}
		Parameters(){
			const obj = new this.$.$mol_form_group();
			(obj.sub) = () => ([
				(this.Age_field()), 
				(this.Sex_field()), 
				(this.Color_field())
			]);
			return obj;
		}
		mail_bid(){
			return "";
		}
		mail(next){
			if(next !== undefined) return next;
			return "";
		}
		Mail_control(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("name@domain.com");
			(obj.value) = (next) => ((this.mail(next)));
			return obj;
		}
		Mail_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("E-mail");
			(obj.bid) = () => ((this.mail_bid()));
			(obj.Content) = () => ((this.Mail_control()));
			return obj;
		}
		signup(next){
			if(next !== undefined) return next;
			return null;
		}
		signup_allowed(){
			return (this.Form().submit_allowed());
		}
		Signup(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("Sign Up");
			(obj.click) = (next) => ((this.signup(next)));
			(obj.enabled) = () => ((this.signup_allowed()));
			return obj;
		}
		result(next){
			if(next !== undefined) return next;
			return "";
		}
		Result(){
			const obj = new this.$.$mol_status();
			(obj.message) = () => ((this.result()));
			return obj;
		}
		Form(){
			const obj = new this.$.$mol_form();
			(obj.body) = () => ([
				(this.Avatars_field()), 
				(this.Names()), 
				(this.Parameters()), 
				(this.Mail_field())
			]);
			(obj.submit) = (next) => ((this.signup(next)));
			(obj.buttons) = () => ([(this.Signup()), (this.Result())]);
			return obj;
		}
		title(){
			return "Sign Up form demo";
		}
		message(){
			return {
				"required": "Required", 
				"adult": "18+ only", 
				"no_spaces": "No spaces!", 
				"need_more_letters": "{count} or more letters", 
				"need_at": "@ is required", 
				"only_one_at": "At most one @", 
				"no_tld": "At least 2 level domain", 
				"dots_inside": "Dots can't be at edge", 
				"no_space_domain": "No space in domain name", 
				"need_username": "Username required"
			};
		}
		sub(){
			return [(this.Form())];
		}
		tags(){
			return [
				"$mol_form_field", 
				"$mol_button", 
				"$mol_row", 
				"$mol_string", 
				"form", 
				"bids", 
				"validation", 
				"field"
			];
		}
		aspects(){
			return ["Widget/Form"];
		}
	};
	($mol_mem(($.$mol_form_demo.prototype), "avatars"));
	($mol_mem(($.$mol_form_demo.prototype), "Avatars_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Avatars_field"));
	($mol_mem(($.$mol_form_demo.prototype), "name_first"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_first_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_first_field"));
	($mol_mem(($.$mol_form_demo.prototype), "name_nick"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_nick_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_nick_field"));
	($mol_mem(($.$mol_form_demo.prototype), "name_second"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_second_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Name_second_field"));
	($mol_mem(($.$mol_form_demo.prototype), "Names"));
	($mol_mem(($.$mol_form_demo.prototype), "age"));
	($mol_mem(($.$mol_form_demo.prototype), "Age_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Age_field"));
	($mol_mem(($.$mol_form_demo.prototype), "sex"));
	($mol_mem(($.$mol_form_demo.prototype), "Sex_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Sex_field"));
	($mol_mem(($.$mol_form_demo.prototype), "color"));
	($mol_mem(($.$mol_form_demo.prototype), "Color_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Color_field"));
	($mol_mem(($.$mol_form_demo.prototype), "Parameters"));
	($mol_mem(($.$mol_form_demo.prototype), "mail"));
	($mol_mem(($.$mol_form_demo.prototype), "Mail_control"));
	($mol_mem(($.$mol_form_demo.prototype), "Mail_field"));
	($mol_mem(($.$mol_form_demo.prototype), "signup"));
	($mol_mem(($.$mol_form_demo.prototype), "Signup"));
	($mol_mem(($.$mol_form_demo.prototype), "result"));
	($mol_mem(($.$mol_form_demo.prototype), "Result"));
	($mol_mem(($.$mol_form_demo.prototype), "Form"));

//# sourceMappingURL=demo.view.tree.js.map