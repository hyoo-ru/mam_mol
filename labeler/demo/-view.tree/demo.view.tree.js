	($.$mol_labeler_demo) = class $mol_labeler_demo extends ($.$mol_example_small) {
		title(){
			return "Labeled content of some types";
		}
		sub(){
			return [(this.Provider()), (this.Name())];
		}
		tags(){
			return [
				"label", 
				"form", 
				"field", 
				"caption"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		Provider(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Provider");
			(obj.content) = () => (["ACME Provider Inc."]);
			return obj;
		}
		user_name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name_control(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Jack Sparrow");
			(obj.value) = (next) => ((this.user_name(next)));
			return obj;
		}
		Name(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("User name");
			(obj.Content) = () => ((this.Name_control()));
			return obj;
		}
	};
	($mol_mem(($.$mol_labeler_demo.prototype), "Provider"));
	($mol_mem(($.$mol_labeler_demo.prototype), "user_name"));
	($mol_mem(($.$mol_labeler_demo.prototype), "Name_control"));
	($mol_mem(($.$mol_labeler_demo.prototype), "Name"));

//# sourceMappingURL=demo.view.tree.js.map