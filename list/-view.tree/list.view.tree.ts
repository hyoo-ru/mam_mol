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
		 * render_over 0
		 * ```
		 */
		render_over() {
			return 0
		}

		/**
		 * ```tree
		 * sub <= rows
		 * ```
		 */
		sub() {
			return this.rows()
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
		 * Gap_before $mol_view style * paddingTop <= gap_before
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
		 * Gap_after $mol_view style * paddingTop <= gap_after
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
		 * gap_before 0
		 * ```
		 */
		gap_before() {
			return 0
		}

		/**
		 * ```tree
		 * gap_after 0
		 * ```
		 */
		gap_after() {
			return 0
		}
	}

}
