namespace $ {
	export class $mol_plot_dot extends $mol_plot_graph {

		/**
		 * ```tree
		 * points_max Infinity
		 * ```
		 */
		points_max() {
			return Infinity
		}

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	stroke-width <= diameter 8
		 * ```
		 */
		style() {
			return {
				...super.style(),
				"stroke-width": this.diameter()
			}
		}

		/**
		 * ```tree
		 * diameter 8
		 * ```
		 */
		diameter() {
			return 8
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
		 * Sample $mol_plot_graph_sample color <= color
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_plot_graph_sample()

			obj.color = () => this.color()

			return obj
		}
	}

}
