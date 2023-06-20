namespace $ {
	export class $mol_plot_ruler extends $mol_plot_graph {
		
		/**
		 * ```tree
		 * step 0
		 * ```
		 */
		step() {
			return 0
		}
		
		/**
		 * ```tree
		 * scale_axis 1
		 * ```
		 */
		scale_axis() {
			return 1
		}
		
		/**
		 * ```tree
		 * scale_step 1
		 * ```
		 */
		scale_step() {
			return 1
		}
		
		/**
		 * ```tree
		 * shift_axis 1
		 * ```
		 */
		shift_axis() {
			return 1
		}
		
		/**
		 * ```tree
		 * dimensions_axis $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_axis() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * viewport_axis $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		viewport_axis() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * axis_points /number
		 * ```
		 */
		axis_points() {
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * normalize? 0
		 * ```
		 */
		@ $mol_mem
		normalize(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * precision 1
		 * ```
		 */
		precision() {
			return 1
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Background
		 * 	<= Curve
		 * 	<= labels_formatted
		 * 	<= Title
		 * ```
		 */
		sub() {
			return [
				this.Background(),
				this.Curve(),
				this.labels_formatted(),
				this.Title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Label* $mol_svg_text
		 * 	pos <= label_pos*
		 * 	text <= label_text*
		 * 	align <= label_align
		 * ```
		 */
		@ $mol_mem_key
		Label(id: any) {
			const obj = new this.$.$mol_svg_text()
			
			obj.pos = () => this.label_pos(id)
			obj.text = () => this.label_text(id)
			obj.align = () => this.label_align()
			
			return obj
		}
		
		/**
		 * ```tree
		 * background_x \0
		 * ```
		 */
		background_x() {
			return "0"
		}
		
		/**
		 * ```tree
		 * background_y \0
		 * ```
		 */
		background_y() {
			return "0"
		}
		
		/**
		 * ```tree
		 * background_width \100%
		 * ```
		 */
		background_width() {
			return "100%"
		}
		
		/**
		 * ```tree
		 * background_height \14
		 * ```
		 */
		background_height() {
			return "14"
		}
		
		/**
		 * ```tree
		 * Background $mol_svg_rect
		 * 	pos_x <= background_x
		 * 	pos_y <= background_y
		 * 	width <= background_width
		 * 	height <= background_height
		 * ```
		 */
		@ $mol_mem
		Background() {
			const obj = new this.$.$mol_svg_rect()
			
			obj.pos_x = () => this.background_x()
			obj.pos_y = () => this.background_y()
			obj.width = () => this.background_width()
			obj.height = () => this.background_height()
			
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
		 * labels_formatted /
		 * ```
		 */
		labels_formatted() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * title_pos_x \0
		 * ```
		 */
		title_pos_x() {
			return "0"
		}
		
		/**
		 * ```tree
		 * title_pos_y \100%
		 * ```
		 */
		title_pos_y() {
			return "100%"
		}
		
		/**
		 * ```tree
		 * title_align \start
		 * ```
		 */
		title_align() {
			return "start"
		}
		
		/**
		 * ```tree
		 * Title $mol_svg_text
		 * 	pos_x <= title_pos_x
		 * 	pos_y <= title_pos_y
		 * 	align <= title_align
		 * 	text <= title
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_svg_text()
			
			obj.pos_x = () => this.title_pos_x()
			obj.pos_y = () => this.title_pos_y()
			obj.align = () => this.title_align()
			obj.text = () => this.title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * label_pos_x* \
		 * ```
		 */
		label_pos_x(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * label_pos_y* \
		 * ```
		 */
		label_pos_y(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * label_pos* /
		 * 	<= label_pos_x*
		 * 	<= label_pos_y*
		 * ```
		 */
		label_pos(id: any) {
			return [
				this.label_pos_x(id),
				this.label_pos_y(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * label_text* \
		 * ```
		 */
		label_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * label_align \
		 * ```
		 */
		label_align() {
			return ""
		}
	}
	
}

