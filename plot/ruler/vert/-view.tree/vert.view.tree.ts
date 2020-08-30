namespace $ {
	export class $mol_plot_ruler_vert extends $mol_plot_ruler {

		/**
		 * ```tree
		 * title_align \end
		 * ```
		 */
		title_align() {
			return "end"
		}

		/**
		 * ```tree
		 * label_align \end
		 * ```
		 */
		label_align() {
			return "end"
		}

		/**
		 * ```tree
		 * title_pos_y \14
		 * ```
		 */
		title_pos_y() {
			return "14"
		}

		/**
		 * ```tree
		 * label_pos_x!v <= title_pos_x
		 * ```
		 */
		label_pos_x(v: any) {
			return this.title_pos_x()
		}

		/**
		 * ```tree
		 * background_height \100%
		 * ```
		 */
		background_height() {
			return "100%"
		}

		/**
		 * ```tree
		 * background_width <= title_pos_x
		 * ```
		 */
		background_width() {
			return this.title_pos_x()
		}
	}

}
