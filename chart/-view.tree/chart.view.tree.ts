namespace $ {
	export class $mol_chart extends $mol_view {

		/**
		 * ```tree
		 * gap_hor 48
		 * ```
		 */
		gap_hor() {
			return 48
		}

		/**
		 * ```tree
		 * gap_vert 24
		 * ```
		 */
		gap_vert() {
			return 24
		}

		/**
		 * ```tree
		 * gap_left <= gap_hor
		 * ```
		 */
		gap_left() {
			return this.gap_hor()
		}

		/**
		 * ```tree
		 * gap_right <= gap_hor
		 * ```
		 */
		gap_right() {
			return this.gap_hor()
		}

		/**
		 * ```tree
		 * gap_bottom <= gap_vert
		 * ```
		 */
		gap_bottom() {
			return this.gap_vert()
		}

		/**
		 * ```tree
		 * gap_top <= gap_vert
		 * ```
		 */
		gap_top() {
			return this.gap_vert()
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
		 * sub /
		 * 	<= Legend $mol_chart_legend graphs <= graphs_colored
		 * 	<= Plot $mol_plot_pane
		 * 		gap_left <= gap_left
		 * 		gap_right <= gap_right
		 * 		gap_bottom <= gap_bottom
		 * 		gap_top <= gap_top
		 * 		graphs <= graphs
		 * 		graphs_colored => graphs_colored
		 * 		hue_base <= hue_base 140
		 * 		hue_shift <= hue_shift 111
		 * ```
		 */
		sub() {
			return [
				this.Legend(),
				this.Plot()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Legend $mol_chart_legend graphs <= graphs_colored
		 * ```
		 */
		@ $mol_mem
		Legend() {
			const obj = new this.$.$mol_chart_legend()

			obj.graphs = () => this.graphs_colored()

			return obj
		}

		/**
		 * ```tree
		 * Plot $mol_plot_pane
		 * 	gap_left <= gap_left
		 * 	gap_right <= gap_right
		 * 	gap_bottom <= gap_bottom
		 * 	gap_top <= gap_top
		 * 	graphs <= graphs
		 * 	graphs_colored => graphs_colored
		 * 	hue_base <= hue_base 140
		 * 	hue_shift <= hue_shift 111
		 * ```
		 */
		@ $mol_mem
		Plot() {
			const obj = new this.$.$mol_plot_pane()

			obj.gap_left = () => this.gap_left()
			obj.gap_right = () => this.gap_right()
			obj.gap_bottom = () => this.gap_bottom()
			obj.gap_top = () => this.gap_top()
			obj.graphs = () => this.graphs()
			obj.hue_base = () => this.hue_base()
			obj.hue_shift = () => this.hue_shift()

			return obj
		}

		/**
		 * ```tree
		 * graphs_colored
		 * ```
		 */
		graphs_colored() {
			return this.Plot().graphs_colored()
		}

		/**
		 * ```tree
		 * hue_base 140
		 * ```
		 */
		hue_base() {
			return 140
		}

		/**
		 * ```tree
		 * hue_shift 111
		 * ```
		 */
		hue_shift() {
			return 111
		}
	}

}
