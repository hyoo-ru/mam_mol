	($.$mol_app_demo_menu) = class $mol_app_demo_menu extends ($.$mol_page) {
		filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter(next)));
			return obj;
		}
		ids_tags(){
			return {};
		}
		levels_expanded_default(){
			return 0;
		}
		levels_expanded(){
			return (this.levels_expanded_default());
		}
		Tree(){
			const obj = new this.$.$mol_tag_tree();
			(obj.Item) = (id) => ((this.Option(id)));
			(obj.ids_tags) = () => ((this.ids_tags()));
			(obj.levels_expanded) = () => ((this.levels_expanded()));
			return obj;
		}
		option_arg(id){
			return {};
		}
		option_title(id){
			return "";
		}
		Option_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_title(id)));
			(obj.needle) = () => ((this.filter()));
			return obj;
		}
		names(){
			return [];
		}
		widget_tags(id){
			return [];
		}
		widget_aspects(id){
			return [];
		}
		widget_title(id){
			return "";
		}
		search_start(next){
			if(next !== undefined) return next;
			return null;
		}
		body(){
			return [(this.Filter()), (this.Tree())];
		}
		Option(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.option_arg(id)));
			(obj.sub) = () => ([(this.Option_title(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_demo_menu.prototype), "filter"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "Filter"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "Tree"));
	($mol_mem_key(($.$mol_app_demo_menu.prototype), "Option_title"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "search_start"));
	($mol_mem_key(($.$mol_app_demo_menu.prototype), "Option"));

//# sourceMappingURL=menu.view.tree.js.map