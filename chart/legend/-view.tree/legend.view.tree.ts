namespace $ {
	export class $mol_chart_legend extends $mol_scroll {
		
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
		 * graphs_front /$mol_plot_graph
		 * ```
		 */
		graphs_front() {
			return [
			] as readonly $mol_plot_graph[]
		}
		
		/**
		 * ```tree
		 * sub <= graph_legends
		 * ```
		 */
		sub() {
			return this.graph_legends()
		}
		
		/**
		 * ```tree
		 * Graph_legend* $mol_view sub /
		 * 	<= Graph_sample_box*
		 * 	<= Graph_title*
		 * ```
		 */
		@ $mol_mem_key
		Graph_legend(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Graph_sample_box(id),
				this.Graph_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * graph_legends /$mol_view
		 * ```
		 */
		graph_legends() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Graph_sample* null
		 * ```
		 */
		Graph_sample(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * Graph_sample_box* $mol_view sub / <= Graph_sample*
		 * ```
		 */
		@ $mol_mem_key
		Graph_sample_box(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Graph_sample(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * graph_title* \
		 * ```
		 */
		graph_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Graph_title* $mol_view sub / <= graph_title*
		 * ```
		 */
		@ $mol_mem_key
		Graph_title(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.graph_title(id)
			] as readonly any[]
			
			return obj
		}
	}
	
}

