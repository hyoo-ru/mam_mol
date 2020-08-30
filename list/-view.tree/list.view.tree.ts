namespace $ {
	export class $mol_list extends $mol_view {

		/**
		 * ```tree
		 * render_visible_only true
		 * ```
		 */
		render_visible_only() {
			return true
		}

		/**
		 * ```tree
		 * render_over 0.5
		 * ```
		 */
		render_over() {
			return 0.5
		}

		/**
		 * ```tree
		 * sub <= rows /$mol_view
		 * ```
		 */
		sub() {
			return this.rows()
		}

		/**
		 * ```tree
		 * rows /$mol_view
		 * ```
		 */
		rows() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * Empty $mol_view
		 * ```
		 */
		@ $mol_mem
		Empty() {
			const obj = new this.$.$mol_view()

			return obj
		}

		/**
		 * ```tree
		 * Gap_before $mol_view style * paddingTop <= gap_before 0
		 * ```
		 */
		@ $mol_mem
		Gap_before() {
			const obj = new this.$.$mol_view()

			obj.style = () => ({
				paddingTop: this.gap_before()
			})

			return obj
		}

		/**
		 * ```tree
		 * gap_before 0
		 * ```
		 */
		gap_before() {
			return 0
		}

		/**
		 * ```tree
		 * Gap_after $mol_view style * paddingTop <= gap_after 0
		 * ```
		 */
		@ $mol_mem
		Gap_after() {
			const obj = new this.$.$mol_view()

			obj.style = () => ({
				paddingTop: this.gap_after()
			})

			return obj
		}

		/**
		 * ```tree
		 * gap_after 0
		 * ```
		 */
		gap_after() {
			return 0
		}

		/**
		 * ```tree
		 * view_window /
		 * 	0
		 * 	0
		 * ```
		 */
		view_window() {
			return [
				0,
				0
			] as readonly any[]
		}
	}

}
