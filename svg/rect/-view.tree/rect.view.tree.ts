namespace $ {
	export class $mol_svg_rect extends $mol_svg {

		/**
		 * ```tree
		 * dom_name \rect
		 * ```
		 */
		dom_name() {
			return "rect"
		}

		/**
		 * ```tree
		 * pos /
		 * ```
		 */
		pos() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	width <= width
		 * 	height <= height
		 * 	x <= pos_x
		 * 	y <= pos_y
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				width: this.width(),
				height: this.height(),
				x: this.pos_x(),
				y: this.pos_y()
			}
		}

		/**
		 * ```tree
		 * width \0
		 * ```
		 */
		width() {
			return "0"
		}

		/**
		 * ```tree
		 * height \0
		 * ```
		 */
		height() {
			return "0"
		}

		/**
		 * ```tree
		 * pos_x \
		 * ```
		 */
		pos_x() {
			return ""
		}

		/**
		 * ```tree
		 * pos_y \
		 * ```
		 */
		pos_y() {
			return ""
		}
	}

}
