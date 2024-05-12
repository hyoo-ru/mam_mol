	($.$mol_plot_line) = class $mol_plot_line extends ($.$mol_plot_graph) {
		curve(){
			return "";
		}
		threshold(){
			return 1;
		}
		spacing(){
			return 2;
		}
		color_fill(){
			return "none";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this?.curve())};
		}
		sub(){
			return [(this?.Hint())];
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.color) = () => ((this?.color()));
			(obj.type) = () => ((this?.type()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_line.prototype), "Sample"));

//# sourceMappingURL=line.view.tree.js.map