	($.$mol_app_hello) = class $mol_app_hello extends ($.$mol_view) {
		sub(){
			return [(this.Name()), (this.Greeting())];
		}
		name_hint(){
			return "Name";
		}
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.name_hint()));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Greeting(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_hello.prototype), "name"));
	($mol_mem(($.$mol_app_hello.prototype), "Name"));
	($mol_mem(($.$mol_app_hello.prototype), "Greeting"));

//# sourceMappingURL=hello.view.tree.js.map