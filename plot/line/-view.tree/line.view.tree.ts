namespace $ {
	export class $mol_plot_line extends $mol_plot_graph {

		/**
		 * ```tree
		 * threshold 1
		 * ```
		 */
		threshold() {
			return 1
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
		 * color_fill \none
		 * ```
		 */
		color_fill() {
			return "none"
		}

		/**
		 * ```tree
		 * sub / <= Curve $mol_svg_path geometry <= curve \
		 * ```
		 */
		sub() {
			return [
				this.Curve()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Curve $mol_svg_path geometry <= curve \
		 * ```
		 */
		@ $mol_mem
		Curve() {
			const obj = new this.$.$mol_svg_path()

			obj.geometry = () => this.curve()

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
		 * Sample $mol_plot_graph_sample
		 * 	color <= color
		 * 	type <= type
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_plot_graph_sample()

			obj.color = () => this.color()
			obj.type = () => this.type()

			return obj
		}
	}

}
