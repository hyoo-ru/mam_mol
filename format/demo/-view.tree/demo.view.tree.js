	($.$mol_format_demo) = class $mol_format_demo extends ($.$mol_example_small) {
		ip(next){
			if(next !== undefined) return next;
			return "";
		}
		Ip(){
			const obj = new this.$.$mol_format();
			(obj.mask) = () => ("___.___.___.___");
			(obj.value) = (next) => ((this?.ip(next)));
			return obj;
		}
		Ip_card(){
			const obj = new this.$.$mol_card();
			(obj.status) = () => ((this?.ip()));
			(obj.Content) = () => ((this?.Ip()));
			return obj;
		}
		phone(next){
			if(next !== undefined) return next;
			return "";
		}
		Phone(){
			const obj = new this.$.$mol_phone();
			(obj.value) = (next) => ((this?.phone(next)));
			return obj;
		}
		Phone_card(){
			const obj = new this.$.$mol_card();
			(obj.status) = () => ((this?.phone()));
			(obj.Content) = () => ((this?.Phone()));
			return obj;
		}
		card(next){
			if(next !== undefined) return next;
			return "";
		}
		Card(){
			const obj = new this.$.$mol_format();
			(obj.mask) = () => ("____ ____ ____ ____");
			(obj.value) = (next) => ((this?.card(next)));
			return obj;
		}
		Card_card(){
			const obj = new this.$.$mol_card();
			(obj.status) = () => ((this?.card()));
			(obj.Content) = () => ((this?.Card()));
			return obj;
		}
		moment(next){
			if(next !== undefined) return next;
			return "";
		}
		Moment(){
			const obj = new this.$.$mol_format();
			(obj.mask) = () => ("__.__.____ __:__");
			(obj.value) = (next) => ((this?.moment(next)));
			return obj;
		}
		Moment_card(){
			const obj = new this.$.$mol_card();
			(obj.status) = () => ((this?.moment()));
			(obj.Content) = () => ((this?.Moment()));
			return obj;
		}
		title(){
			return "Formatted string input/output";
		}
		sub(){
			return [
				(this?.Ip_card()), 
				(this?.Phone_card()), 
				(this?.Card_card()), 
				(this?.Moment_card())
			];
		}
		tags(){
			return [
				"phone", 
				"ip", 
				"car", 
				"datetime", 
				"input"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/String"];
		}
	};
	($mol_mem(($.$mol_format_demo.prototype), "ip"));
	($mol_mem(($.$mol_format_demo.prototype), "Ip"));
	($mol_mem(($.$mol_format_demo.prototype), "Ip_card"));
	($mol_mem(($.$mol_format_demo.prototype), "phone"));
	($mol_mem(($.$mol_format_demo.prototype), "Phone"));
	($mol_mem(($.$mol_format_demo.prototype), "Phone_card"));
	($mol_mem(($.$mol_format_demo.prototype), "card"));
	($mol_mem(($.$mol_format_demo.prototype), "Card"));
	($mol_mem(($.$mol_format_demo.prototype), "Card_card"));
	($mol_mem(($.$mol_format_demo.prototype), "moment"));
	($mol_mem(($.$mol_format_demo.prototype), "Moment"));
	($mol_mem(($.$mol_format_demo.prototype), "Moment_card"));

//# sourceMappingURL=demo.view.tree.js.map