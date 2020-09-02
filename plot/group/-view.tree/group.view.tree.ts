namespace $ {
	export class $mol_plot_group extends $mol_plot_graph {

		/**
		 * ```tree
		 * sub <= graphs_enriched
		 * ```
		 */
		sub() {
			return this.graphs_enriched()
		}

		/**
		 * ```tree
		 * Sample $mol_plot_graph_sample sub <= graph_samples
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
		 * graphs /$mol_plot_graph
		 * ```
		 */
		graphs() {
			return [

			] as readonly $mol_plot_graph[]
		}

		/**
		 * ```tree
		 * graphs_enriched <= graphs
		 * ```
		 */
		graphs_enriched() {
			return this.graphs()
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
