namespace $ {
	export class $mol_plot_fill extends $mol_plot_graph {

		/**
		 * ```tree
		 * threshold 4
		 * ```
		 */
		threshold() {
			return 4
		}

		/**
		 * ```tree
		 * spacing 2
		 * ```
		 */
		spacing() {
			return 2
		}

		/**
		 * ```tree
		 * sub / <= Curve
		 * ```
		 */
		sub() {
			return [
				this.Curve()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Sample $mol_plot_graph_sample color <= color
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_plot_graph_sample()

			obj.color = () => this.color()

			return obj
		}

		/**
		 * ```tree
		 * curve \
		 * ```
		 */
		curve() {
			return ""
		}

		/**
		 * ```tree
		 * Curve $mol_svg_path geometry <= curve
		 * ```
		 */
		@ $mol_mem
		Curve() {
			const obj = new this.$.$mol_svg_path()

			obj.geometry = () => this.curve()

			return obj
		}
	}

}
