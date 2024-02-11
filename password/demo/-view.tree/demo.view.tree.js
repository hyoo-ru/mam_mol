	($.$mol_password_demo) = class $mol_password_demo extends ($.$mol_example_small) {
		title(){
			return "Password input field based on $mol_string";
		}
		sub(){
			return [(this.Simple()), (this.Hint())];
		}
		tags(){
			return ["input"];
		}
		aspects(){
			return ["Widget/Control", "Type/String"];
		}
		pass(next){
			if(next !== undefined) return next;
			return "Hello world";
		}
		Simple(){
			const obj = new this.$.$mol_password();
			(obj.value) = (next) => ((this.pass(next)));
			return obj;
		}
		pass2(next){
			if(next !== undefined) return next;
			return "";
		}
		Hint(){
			const obj = new this.$.$mol_password();
			(obj.value) = (next) => ((this.pass2(next)));
			(obj.hint) = () => ("Top secret");
			return obj;
		}
	};
	($mol_mem(($.$mol_password_demo.prototype), "pass"));
	($mol_mem(($.$mol_password_demo.prototype), "Simple"));
	($mol_mem(($.$mol_password_demo.prototype), "pass2"));
	($mol_mem(($.$mol_password_demo.prototype), "Hint"));

//# sourceMappingURL=demo.view.tree.js.map