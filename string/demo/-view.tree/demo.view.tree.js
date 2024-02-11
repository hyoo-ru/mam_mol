	($.$mol_string_demo) = class $mol_string_demo extends ($.$mol_example_small) {
		title(){
			return "String input field in various states";
		}
		sub(){
			return [
				(this.Simple()), 
				(this.Hint()), 
				(this.Broken()), 
				(this.Filled()), 
				(this.Disabled()), 
				(this.Button())
			];
		}
		tags(){
			return [
				"input", 
				"text", 
				"field"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/String"];
		}
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Simple(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Batman");
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		broken(next){
			if(next !== undefined) return next;
			return "";
		}
		Broken(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Broken");
			(obj.value) = (next) => ((this.broken(next)));
			return obj;
		}
		name2(next){
			if(next !== undefined) return next;
			return "Jocker";
		}
		Filled(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.name2(next)));
			return obj;
		}
		Disabled(){
			const obj = new this.$.$mol_string();
			(obj.disabled) = () => (true);
			(obj.value) = (next) => ((this.name2(next)));
			return obj;
		}
		Button(){
			const obj = new this.$.$mol_string_button();
			(obj.value) = (next) => ((this.name2(next)));
			return obj;
		}
	};
	($mol_mem(($.$mol_string_demo.prototype), "name"));
	($mol_mem(($.$mol_string_demo.prototype), "Simple"));
	($mol_mem(($.$mol_string_demo.prototype), "Hint"));
	($mol_mem(($.$mol_string_demo.prototype), "broken"));
	($mol_mem(($.$mol_string_demo.prototype), "Broken"));
	($mol_mem(($.$mol_string_demo.prototype), "name2"));
	($mol_mem(($.$mol_string_demo.prototype), "Filled"));
	($mol_mem(($.$mol_string_demo.prototype), "Disabled"));
	($mol_mem(($.$mol_string_demo.prototype), "Button"));

//# sourceMappingURL=demo.view.tree.js.map