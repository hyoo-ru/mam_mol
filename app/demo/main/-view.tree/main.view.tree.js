	($.$mol_app_demo_main) = class $mol_app_demo_main extends ($.$mol_page) {
		Lights(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		project_uri(){
			return "https://github.com/eigenmethod/mol/tree/master/";
		}
		Project(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this.project_uri()));
			return obj;
		}
		description(){
			return "";
		}
		Description(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.description()));
			(obj.uri_base) = () => ((this.project_uri()));
			return obj;
		}
		minimal_width(){
			return 400;
		}
		title(){
			return "$mol libs for web ui";
		}
		tools(){
			return [(this.Lights()), (this.Project())];
		}
		body(){
			return [(this.Description())];
		}
	};
	($mol_mem(($.$mol_app_demo_main.prototype), "Lights"));
	($mol_mem(($.$mol_app_demo_main.prototype), "Project"));
	($mol_mem(($.$mol_app_demo_main.prototype), "Description"));

//# sourceMappingURL=main.view.tree.js.map