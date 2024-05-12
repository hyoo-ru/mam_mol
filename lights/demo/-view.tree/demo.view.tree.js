	($.$mol_lights_demo) = class $mol_lights_demo extends ($.$mol_example_small) {
		Theme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		Lighter(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		Sample(){
			const obj = new this.$.$mol_view();
			(obj.plugins) = () => ([(this?.Theme())]);
			(obj.sub) = () => ([(this?.Lighter())]);
			return obj;
		}
		title(){
			return "Switcher between light/dark themes (usually for `$mol_theme_auto` plugin).";
		}
		sub(){
			return [(this?.Sample())];
		}
		tags(){
			return [
				"light", 
				"dark", 
				"theme", 
				"switcher", 
				"toggle"
			];
		}
		aspects(){
			return ["Widget/Control/Button", "Theme"];
		}
	};
	($mol_mem(($.$mol_lights_demo.prototype), "Theme"));
	($mol_mem(($.$mol_lights_demo.prototype), "Lighter"));
	($mol_mem(($.$mol_lights_demo.prototype), "Sample"));

//# sourceMappingURL=demo.view.tree.js.map