namespace $ {
	export class $mol_chart_demo_forces extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Fake wheel forces
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_forces_title' )
		}

		/**
		 * ```tree
		 * samples_count 10000
		 * ```
		 */
		samples_count() {
			return 10000
		}

		/**
		 * ```tree
		 * points_max 600
		 * ```
		 */
		points_max() {
			return 600
		}

		/**
		 * ```tree
		 * sub / <= Chart $mol_chart graphs /
		 * 	<= Forces_left $mol_plot_dot
		 * 		title <= forces_left_title @ \Left wheel
		 * 		series_x <= forces_left_x /number
		 * 		series_y <= forces_left_y /number
		 * 		points_max <= points_max
		 * 	<= Forces_right $mol_plot_dot
		 * 		title <= forces_right_title @ \Right wheel
		 * 		series_x <= forces_right_x /number
		 * 		series_y <= forces_right_y /number
		 * 		points_max <= points_max
		 * 	<= Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \kN
		 * 	<= Hor_ruler $mol_plot_ruler_hor
		 * 		title <= hor_title @ \cm
		 * 		series_x <= forces_left_x
		 * 	<= Cross $mol_plot_mark_cross graphs /
		 * 		<= Forces_left
		 * 		<= Forces_right
		 * ```
		 */
		sub() {
			return [
				this.Chart()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Chart $mol_chart graphs /
		 * 	<= Forces_left $mol_plot_dot
		 * 		title <= forces_left_title @ \Left wheel
		 * 		series_x <= forces_left_x /number
		 * 		series_y <= forces_left_y /number
		 * 		points_max <= points_max
		 * 	<= Forces_right $mol_plot_dot
		 * 		title <= forces_right_title @ \Right wheel
		 * 		series_x <= forces_right_x /number
		 * 		series_y <= forces_right_y /number
		 * 		points_max <= points_max
		 * 	<= Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \kN
		 * 	<= Hor_ruler $mol_plot_ruler_hor
		 * 		title <= hor_title @ \cm
		 * 		series_x <= forces_left_x
		 * 	<= Cross $mol_plot_mark_cross graphs /
		 * 		<= Forces_left
		 * 		<= Forces_right
		 * ```
		 */
		@ $mol_mem
		Chart() {
			const obj = new this.$.$mol_chart()

			obj.graphs = () => [
				this.Forces_left(),
				this.Forces_right(),
				this.Vert_ruler(),
				this.Hor_ruler(),
				this.Cross()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Forces_left $mol_plot_dot
		 * 	title <= forces_left_title @ \Left wheel
		 * 	series_x <= forces_left_x /number
		 * 	series_y <= forces_left_y /number
		 * 	points_max <= points_max
		 * ```
		 */
		@ $mol_mem
		Forces_left() {
			const obj = new this.$.$mol_plot_dot()

			obj.title = () => this.forces_left_title()
			obj.series_x = () => this.forces_left_x()
			obj.series_y = () => this.forces_left_y()
			obj.points_max = () => this.points_max()

			return obj
		}

		/**
		 * ```tree
		 * forces_left_title @ \Left wheel
		 * ```
		 */
		forces_left_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_forces_forces_left_title' )
		}

		/**
		 * ```tree
		 * forces_left_x /number
		 * ```
		 */
		forces_left_x() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * forces_left_y /number
		 * ```
		 */
		forces_left_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Forces_right $mol_plot_dot
		 * 	title <= forces_right_title @ \Right wheel
		 * 	series_x <= forces_right_x /number
		 * 	series_y <= forces_right_y /number
		 * 	points_max <= points_max
		 * ```
		 */
		@ $mol_mem
		Forces_right() {
			const obj = new this.$.$mol_plot_dot()

			obj.title = () => this.forces_right_title()
			obj.series_x = () => this.forces_right_x()
			obj.series_y = () => this.forces_right_y()
			obj.points_max = () => this.points_max()

			return obj
		}

		/**
		 * ```tree
		 * forces_right_title @ \Right wheel
		 * ```
		 */
		forces_right_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_forces_forces_right_title' )
		}

		/**
		 * ```tree
		 * forces_right_x /number
		 * ```
		 */
		forces_right_x() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * forces_right_y /number
		 * ```
		 */
		forces_right_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \kN
		 * ```
		 */
		@ $mol_mem
		Vert_ruler() {
			const obj = new this.$.$mol_plot_ruler_vert()

			obj.title = () => this.vert_title()

			return obj
		}

		/**
		 * ```tree
		 * vert_title @ \kN
		 * ```
		 */
		vert_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_forces_vert_title' )
		}

		/**
		 * ```tree
		 * Hor_ruler $mol_plot_ruler_hor
		 * 	title <= hor_title @ \cm
		 * 	series_x <= forces_left_x
		 * ```
		 */
		@ $mol_mem
		Hor_ruler() {
			const obj = new this.$.$mol_plot_ruler_hor()

			obj.title = () => this.hor_title()
			obj.series_x = () => this.forces_left_x()

			return obj
		}

		/**
		 * ```tree
		 * hor_title @ \cm
		 * ```
		 */
		hor_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_forces_hor_title' )
		}

		/**
		 * ```tree
		 * Cross $mol_plot_mark_cross graphs /
		 * 	<= Forces_left
		 * 	<= Forces_right
		 * ```
		 */
		@ $mol_mem
		Cross() {
			const obj = new this.$.$mol_plot_mark_cross()

			obj.graphs = () => [
				this.Forces_left(),
				this.Forces_right()
			] as readonly any[]

			return obj
		}
	}

}
