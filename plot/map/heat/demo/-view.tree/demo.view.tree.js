	($.$mol_plot_map_heat_demo) = class $mol_plot_map_heat_demo extends ($.$mol_example_large) {
		zoom(next){
			return (this?.Plot()?.scale_y(next));
		}
		terrain_x(){
			return [];
		}
		terrain_y(){
			return [];
		}
		terrain_z(){
			return [];
		}
		Terrain(){
			const obj = new this.$.$mol_plot_map_heat();
			(obj.series_x) = () => ((this?.terrain_x()));
			(obj.series_y) = () => ((this?.terrain_y()));
			(obj.series_z) = () => ((this?.terrain_z()));
			return obj;
		}
		Plot(){
			const obj = new this.$.$mol_plot_pane();
			(obj.zoom) = (next) => ((this?.zoom(next)));
			(obj.graphs) = () => ([(this?.Terrain())]);
			return obj;
		}
		title(){
			return "Dynamic Heat Map Graphs";
		}
		count_x(){
			return 20;
		}
		count_y(){
			return 200;
		}
		count_z(){
			return 20;
		}
		sub(){
			return [(this?.Plot())];
		}
		tags(){
			return [
				"$mol_plot_pane", 
				"visualization", 
				"heatmap", 
				"graph", 
				"dashboard"
			];
		}
		aspects(){
			return ["Widget/Draw/Chart/Heat"];
		}
	};
	($mol_mem(($.$mol_plot_map_heat_demo.prototype), "Terrain"));
	($mol_mem(($.$mol_plot_map_heat_demo.prototype), "Plot"));

//# sourceMappingURL=demo.view.tree.js.map