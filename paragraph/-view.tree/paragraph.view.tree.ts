namespace $ {
	export class $mol_paragraph extends $mol_view {
		
		/**
		 * ```tree
		 * line_height 24
		 * ```
		 */
		line_height() {
			return 24
		}
		
		/**
		 * ```tree
		 * letter_width 7
		 * ```
		 */
		letter_width() {
			return 7
		}
		
		/**
		 * ```tree
		 * width_limit +Infinity
		 * ```
		 */
		width_limit() {
			return +Infinity
		}
		
		/**
		 * ```tree
		 * sub / <= title
		 * ```
		 */
		sub() {
			return [
				this.title()
			] as readonly any[]
		}
	}
	
}

