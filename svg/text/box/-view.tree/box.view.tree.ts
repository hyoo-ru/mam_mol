namespace $ {
	export class $mol_svg_text_box extends $mol_svg_group {

		/**
		 * ```tree
		 * font_size 16
		 * ```
		 */
		font_size() {
			return 16
		}

		/**
		 * ```tree
		 * width 0
		 * ```
		 */
		width() {
			return 0
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Back $mol_svg_rect
		 * 		width <= box_width \0.5rem
		 * 		height <= box_height \1rem
		 * 		pos /
		 * 			<= box_pos_x <= pos_x
		 * 			<= box_pos_y \0
		 * 	<= Text $mol_svg_text
		 * 		pos /
		 * 			<= pos_x \0
		 * 			<= pos_y \100%
		 * 		align <= align \start
		 * 		sub / <= text \
		 * ```
		 */
		sub() {
			return [
				this.Back(),
				this.Text()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Back $mol_svg_rect
		 * 	width <= box_width \0.5rem
		 * 	height <= box_height \1rem
		 * 	pos /
		 * 		<= box_pos_x <= pos_x
		 * 		<= box_pos_y \0
		 * ```
		 */
		@ $mol_mem
		Back() {
			const obj = new this.$.$mol_svg_rect()

			obj.width = () => this.box_width()
			obj.height = () => this.box_height()
			obj.pos = () => [
				this.box_pos_x(),
				this.box_pos_y()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * box_width \0.5rem
		 * ```
		 */
		box_width() {
			return "0.5rem"
		}

		/**
		 * ```tree
		 * box_height \1rem
		 * ```
		 */
		box_height() {
			return "1rem"
		}

		/**
		 * ```tree
		 * box_pos_x <= pos_x
		 * ```
		 */
		box_pos_x() {
			return this.pos_x()
		}

		/**
		 * ```tree
		 * box_pos_y \0
		 * ```
		 */
		box_pos_y() {
			return "0"
		}

		/**
		 * ```tree
		 * Text $mol_svg_text
		 * 	pos /
		 * 		<= pos_x \0
		 * 		<= pos_y \100%
		 * 	align <= align \start
		 * 	sub / <= text \
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_svg_text()

			obj.pos = () => [
				this.pos_x(),
				this.pos_y()
			] as readonly any[]
			obj.align = () => this.align()
			obj.sub = () => [
				this.text()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * pos_x \0
		 * ```
		 */
		pos_x() {
			return "0"
		}

		/**
		 * ```tree
		 * pos_y \100%
		 * ```
		 */
		pos_y() {
			return "100%"
		}

		/**
		 * ```tree
		 * align \start
		 * ```
		 */
		align() {
			return "start"
		}

		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
	}

}
