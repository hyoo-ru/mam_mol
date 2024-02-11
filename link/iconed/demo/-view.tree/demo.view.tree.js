	($.$mol_link_iconed_demo) = class $mol_link_iconed_demo extends ($.$mol_example_small) {
		title(){
			return "Link with icon";
		}
		sub(){
			return [(this.Blocks())];
		}
		tags(){
			return [
				"link", 
				"icon", 
				"url"
			];
		}
		aspects(){
			return ["Navigation", "Widget/Button"];
		}
		uri(next){
			if(next !== undefined) return next;
			return "https://www.google.com/search?q=%24mol";
		}
		Input(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.uri(next)));
			return obj;
		}
		Output(){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Blocks(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Input()), (this.Output())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_link_iconed_demo.prototype), "uri"));
	($mol_mem(($.$mol_link_iconed_demo.prototype), "Input"));
	($mol_mem(($.$mol_link_iconed_demo.prototype), "Output"));
	($mol_mem(($.$mol_link_iconed_demo.prototype), "Blocks"));

//# sourceMappingURL=demo.view.tree.js.map