	($.$mol_plot_bar) = class $mol_plot_bar extends ($.$mol_plot_graph) {
		style(){
			return {...(super.style()), "stroke-width": (this.stroke_width())};
		}
		sub(){
			return [(this.Hint()), (this.Curve())];
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.color) = () => ((this.color()));
			return obj;
		}
		stroke_width(){
			return "1rem";
		}
		curve(){
			return "";
		}
		Curve(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.curve()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_bar.prototype), "Sample"));
	($mol_mem(($.$mol_plot_bar.prototype), "Curve"));

//# sourceMappingURL=bar.view.tree.js.map