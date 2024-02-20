	($.$mol_plot_group) = class $mol_plot_group extends ($.$mol_plot_graph) {
		graphs(){
			return [];
		}
		graphs_enriched(){
			return (this.graphs());
		}
		graph_samples(){
			return [];
		}
		sub(){
			return (this.graphs_enriched());
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.sub) = () => ((this.graph_samples()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_group.prototype), "Sample"));

//# sourceMappingURL=group.view.tree.js.map