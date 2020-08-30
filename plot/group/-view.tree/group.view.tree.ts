namespace $ {
	export class $mol_plot_group extends $mol_plot_graph {

		/**
		 * ```tree
		 * sub <= graphs_enriched <= graphs /$mol_plot_graph
		 * ```
		 */
		sub() {
			return this.graphs_enriched()
		}

		/**
		 * ```tree
		 * graphs_enriched <= graphs /$mol_plot_graph
		 * ```
		 */
		graphs_enriched() {
			return this.graphs()
		}

		/**
		 * ```tree
		 * graphs /$mol_plot_graph
		 * ```
		 */
		graphs() {
			return [

			] as readonly $mol_plot_graph[]
		}

		/**
		 * ```tree
		 * Sample $mol_plot_graph_sample sub <= graph_samples /$mol_view
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_plot_graph_sample()

			obj.sub = () => this.graph_samples()

			return obj
		}

		/**
		 * ```tree
		 * graph_samples /$mol_view
		 * ```
		 */
		graph_samples() {
			return [

			] as readonly $mol_view[]
		}
	}

}
