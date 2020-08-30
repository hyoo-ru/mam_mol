namespace $ {
	export class $mol_plot_bar extends $mol_plot_graph {

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	stroke-width <= stroke_width \1rem
		 * ```
		 */
		style() {
			return {
				...super.style(),
				"stroke-width": this.stroke_width()
			}
		}

		/**
		 * ```tree
		 * stroke_width \1rem
		 * ```
		 */
		stroke_width() {
			return "1rem"
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
