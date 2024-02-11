	($.$mol_plot_map_heat) = class $mol_plot_map_heat extends ($.$mol_plot_group) {
		series_z(){
			return [];
		}
		graphs(){
			return (this.level_graphs());
		}
		Level(id){
			const obj = new this.$.$mol_plot_map_heat_level();
			(obj.hint) = () => ((this.level_hint(id)));
			(obj.points) = () => ((this.level_points(id)));
			(obj.opacity) = () => ((this.level_opacity(id)));
			(obj.diameter) = () => ((this.level_diameter()));
			(obj.aspect) = () => ((this.level_aspect()));
			return obj;
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.color) = () => ((this.color()));
			return obj;
		}
		level_graphs(){
			return [];
		}
		level_hint(id){
			return "";
		}
		level_points(id){
			return [];
		}
		level_opacity(id){
			return "1";
		}
		level_diameter(){
			return 10;
		}
		level_aspect(){
			return 1;
		}
	};
	($mol_mem_key(($.$mol_plot_map_heat.prototype), "Level"));
	($mol_mem(($.$mol_plot_map_heat.prototype), "Sample"));
	($.$mol_plot_map_heat_level) = class $mol_plot_map_heat_level extends ($.$mol_plot_dot) {
		style(){
			return {...(super.style()), "opacity": (this.opacity())};
		}
		opacity(){
			return "1";
		}
	};

//# sourceMappingURL=heat.view.tree.js.map