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
		 * dom_name \path
		 * ```
		 */
		dom_name() {
			return "path"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	d <= curve
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				d: this.curve()
			}
		}
		
		/**
		 * ```tree
		 * sub / <= Hint
		 * ```
		 */
		sub() {
			return [
				this.Hint()
			] as readonly any[]
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
		
		/**
		 * ```tree
		 * curve \
		 * ```
		 */
		curve() {
			return ""
		}
	}
	
}

