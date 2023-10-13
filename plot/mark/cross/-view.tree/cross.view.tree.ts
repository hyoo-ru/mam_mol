namespace $ {
	export class $mol_plot_mark_cross extends $mol_plot_graph {
		
		/**
		 * ```tree
		 * labels /string
		 * ```
		 */
		labels() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * title_x_gap 4
		 * ```
		 */
		title_x_gap() {
			return 4
		}
		
		/**
		 * ```tree
		 * title_y_gap 22
		 * ```
		 */
		title_y_gap() {
			return 22
		}
		
		/**
		 * ```tree
		 * threshold 16
		 * ```
		 */
		threshold() {
			return 16
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
		 * dimensions $mol_vector_2d /
		 * 	<= dimensions_x
		 * 	<= dimensions_y
		 * ```
		 */
		@ $mol_mem
		dimensions() {
			const obj = new this.$.$mol_vector_2d(
				this.dimensions_x(),
				this.dimensions_y()
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Curve
		 * 	<= Label_x
		 * 	<= Label_y
		 * ```
		 */
		sub() {
			return [
				this.Curve(),
				this.Label_x(),
				this.Label_y()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * dimensions_x $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_x() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * dimensions_y $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_y() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)
			
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
		
		/**
		 * ```tree
		 * title_x_pos_x \0
		 * ```
		 */
		title_x_pos_x() {
			return "0"
		}
		
		/**
		 * ```tree
		 * title_x_pos_y \100%
		 * ```
		 */
		title_x_pos_y() {
			return "100%"
		}
		
		/**
		 * ```tree
		 * title_x \
		 * ```
		 */
		title_x() {
			return ""
		}
		
		/**
		 * ```tree
		 * Label_x $mol_svg_text_box
		 * 	pos_x <= title_x_pos_x
		 * 	pos_y <= title_x_pos_y
		 * 	text <= title_x
		 * ```
		 */
		@ $mol_mem
		Label_x() {
			const obj = new this.$.$mol_svg_text_box()
			
			obj.pos_x = () => this.title_x_pos_x()
			obj.pos_y = () => this.title_x_pos_y()
			obj.text = () => this.title_x()
			
			return obj
		}
		
		/**
		 * ```tree
		 * title_y_pos_x \0
		 * ```
		 */
		title_y_pos_x() {
			return "0"
		}
		
		/**
		 * ```tree
		 * title_y_pos_y \0
		 * ```
		 */
		title_y_pos_y() {
			return "0"
		}
		
		/**
		 * ```tree
		 * title_y \
		 * ```
		 */
		title_y() {
			return ""
		}
		
		/**
		 * ```tree
		 * Label_y $mol_svg_text_box
		 * 	pos_x <= title_y_pos_x
		 * 	pos_y <= title_y_pos_y
		 * 	text <= title_y
		 * ```
		 */
		@ $mol_mem
		Label_y() {
			const obj = new this.$.$mol_svg_text_box()
			
			obj.pos_x = () => this.title_y_pos_x()
			obj.pos_y = () => this.title_y_pos_y()
			obj.text = () => this.title_y()
			
			return obj
		}
	}
	
}

