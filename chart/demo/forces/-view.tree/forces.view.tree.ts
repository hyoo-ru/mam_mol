namespace $ {
	export class $mol_chart_demo_forces extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Fake wheel forces
		 * ```
		 */
		title() {
			return "Fake wheel forces"
		}
		
		/**
		 * ```tree
		 * samples_count 5000
		 * ```
		 */
		samples_count() {
			return 5000
		}
		
		/**
		 * ```tree
		 * points_max 2500
		 * ```
		 */
		points_max() {
			return 2500
		}
		
		/**
		 * ```tree
		 * sub / <= Chart
		 * ```
		 */
		sub() {
			return [
				this.Chart()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\chart
		 * 	\plot
		 * 	\visualization
		 * 	\dashboard
		 * ```
		 */
		tags() {
			return [
				"chart",
				"plot",
				"visualization",
				"dashboard"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Draw
		 * ```
		 */
		aspects() {
			return [
				"Widget/Draw"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * forces_left_title \Left wheel
		 * ```
		 */
		forces_left_title() {
			return "Left wheel"
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
		 * Forces_left $mol_plot_dot
		 * 	title <= forces_left_title
		 * 	series_x <= forces_left_x
		 * 	series_y <= forces_left_y
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
		 * forces_right_title \Right wheel
		 * ```
		 */
		forces_right_title() {
			return "Right wheel"
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
		 * Forces_right $mol_plot_dot
		 * 	title <= forces_right_title
		 * 	series_x <= forces_right_x
		 * 	series_y <= forces_right_y
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
		 * vert_title \kN
		 * ```
		 */
		vert_title() {
			return "kN"
		}
		
		/**
		 * ```tree
		 * Vert_ruler $mol_plot_ruler_vert title <= vert_title
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
		 * hor_title \cm
		 * ```
		 */
		hor_title() {
			return "cm"
		}
		
		/**
		 * ```tree
		 * Hor_ruler $mol_plot_ruler_hor
		 * 	title <= hor_title
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
		
		/**
		 * ```tree
		 * Chart $mol_chart graphs /
		 * 	<= Forces_left
		 * 	<= Forces_right
		 * 	<= Vert_ruler
		 * 	<= Hor_ruler
		 * 	<= Cross
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
	}
	
}

