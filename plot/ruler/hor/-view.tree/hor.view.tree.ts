namespace $ {
	export class $mol_plot_ruler_hor extends $mol_plot_ruler {

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
		 * label_align \middle
		 * ```
		 */
		label_align() {
			return "middle"
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
		 * label_pos_y!v <= title_pos_y
		 * ```
		 */
		label_pos_y(v: any) {
			return this.title_pos_y()
		}

		/**
		 * ```tree
		 * background_width \100%
		 * ```
		 */
		background_width() {
			return "100%"
		}
	}

}
