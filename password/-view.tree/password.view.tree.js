	($.$mol_password) = class $mol_password extends ($.$mol_view) {
		type(next){
			if(next !== undefined) return next;
			return "password";
		}
		sub(){
			return (this.content());
		}
		hint(){
			return "";
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		Pass(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.hint) = () => ((this.hint()));
			(obj.value) = (next) => ((this.value(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		checked(next){
			if(next !== undefined) return next;
			return true;
		}
		Show_icon(){
			const obj = new this.$.$mol_icon_eye();
			return obj;
		}
		Show(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this.checked(next)));
			(obj.Icon) = () => ((this.Show_icon()));
			return obj;
		}
		content(){
			return [(this.Pass()), (this.Show())];
		}
	};
	($mol_mem(($.$mol_password.prototype), "type"));
	($mol_mem(($.$mol_password.prototype), "value"));
	($mol_mem(($.$mol_password.prototype), "submit"));
	($mol_mem(($.$mol_password.prototype), "Pass"));
	($mol_mem(($.$mol_password.prototype), "checked"));
	($mol_mem(($.$mol_password.prototype), "Show_icon"));
	($mol_mem(($.$mol_password.prototype), "Show"));

//# sourceMappingURL=password.view.tree.js.map