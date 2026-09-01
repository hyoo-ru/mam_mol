	($.$mol_plot_dot) = class $mol_plot_dot extends ($.$mol_plot_graph) {
		diameter(){
			return 8;
		}
		curve(){
			return "";
		}
		Curve(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.curve()));
			return obj;
		}
		points_max(){
			return +Infinity;
		}
		aspect(){
			return 1;
		}
		style(){
			return {...(super.style()), "stroke-width": (this.diameter())};
		}
		sub(){
			return [(this.Hint()), (this.Curve())];
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.color) = () => ((this.color()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_dot.prototype), "Curve"));
	($mol_mem(($.$mol_plot_dot.prototype), "Sample"));

//# sourceMappingURL=dot.view.tree.js.map