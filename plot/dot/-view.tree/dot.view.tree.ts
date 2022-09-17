namespace $ {
	export class $mol_plot_dot extends $mol_plot_graph {
		
		/**
		 * ```tree
		 * points_max Infinity
		 * ```
		 */
		@ $mol_mem
		points_max() {
			const obj = new this.$.Infinity()
			
			return obj
		}
		
		/**
		 * ```tree
		 * aspect 1
		 * ```
		 */
		aspect() {
			return 1
		}
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	stroke-width <= diameter
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
		 * sub /
		 * 	<= Hint
		 * 	<= Curve
		 * ```
		 */
		sub() {
			return [
				this.Hint(),
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
		 * diameter 8
		 * ```
		 */
		diameter() {
			return 8
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

