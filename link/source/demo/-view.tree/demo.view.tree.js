	($.$mol_link_source_demo) = class $mol_link_source_demo extends ($.$mol_example_small) {
		uri(next){
			if(next !== undefined) return next;
			return "https://github.com/hyoo-ru/mam_mol/";
		}
		Input(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this?.uri(next)));
			return obj;
		}
		Output(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this?.uri()));
			return obj;
		}
		Blocks(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Input()), (this?.Output())]);
			return obj;
		}
		title(){
			return "Link with icon";
		}
		sub(){
			return [(this?.Blocks())];
		}
		tags(){
			return [
				"link", 
				"icon", 
				"source", 
				"github", 
				"url"
			];
		}
		aspects(){
			return ["Navigation", "Widget/Button"];
		}
	};
	($mol_mem(($.$mol_link_source_demo.prototype), "uri"));
	($mol_mem(($.$mol_link_source_demo.prototype), "Input"));
	($mol_mem(($.$mol_link_source_demo.prototype), "Output"));
	($mol_mem(($.$mol_link_source_demo.prototype), "Blocks"));

//# sourceMappingURL=demo.view.tree.js.map