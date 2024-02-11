	($.$mol_select_demo_colors) = class $mol_select_demo_colors extends ($.$mol_example_small) {
		title(){
			return "Color picker with filter and custom rows";
		}
		sub(){
			return [(this.Color())];
		}
		tags(){
			return [
				"select", 
				"color", 
				"picker", 
				"filter"
			];
		}
		aspects(){
			return ["Widget/Control"];
		}
		color_filter(){
			return (this.Color().filter_pattern());
		}
		color(next){
			if(next !== undefined) return next;
			return "";
		}
		colors(){
			return {};
		}
		color_name(id){
			return "";
		}
		option_color(id){
			return "";
		}
		Color_preview(id){
			const obj = new this.$.$mol_select_colors_color_preview();
			(obj.color) = () => ((this.option_color(id)));
			return obj;
		}
		Color_name(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.color_name(id)));
			(obj.needle) = () => ((this.color_filter()));
			return obj;
		}
		Color_option(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Color_preview(id)), (this.Color_name(id))]);
			(obj.minimal_height) = () => (40);
			return obj;
		}
		option_content(id){
			return [(this.Color_option(id))];
		}
		Color(){
			const obj = new this.$.$mol_select();
			(obj.value) = (next) => ((this.color(next)));
			(obj.dictionary) = () => ((this.colors()));
			(obj.option_label) = (id) => ((this.color_name(id)));
			(obj.option_content) = (id) => ((this.option_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_select_demo_colors.prototype), "color"));
	($mol_mem_key(($.$mol_select_demo_colors.prototype), "Color_preview"));
	($mol_mem_key(($.$mol_select_demo_colors.prototype), "Color_name"));
	($mol_mem_key(($.$mol_select_demo_colors.prototype), "Color_option"));
	($mol_mem(($.$mol_select_demo_colors.prototype), "Color"));
	($.$mol_select_colors_color_preview) = class $mol_select_colors_color_preview extends ($.$mol_view) {
		style(){
			return {...(super.style()), "background": (this.color())};
		}
		color(){
			return "";
		}
	};

//# sourceMappingURL=colors.view.tree.js.map