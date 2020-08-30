namespace $ {
	export class $mol_chart_demo_simple extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Simple chart with hadcoded series
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_simple_title' )
		}

		/**
		 * ```tree
		 * sub / <= Chart $mol_chart graphs /
		 * 	<= Plan $mol_plot_bar
		 * 		title <= plan_title @ \Plan
		 * 		series_y <= plan /
		 * 			10
		 * 			20
		 * 			30
		 * 			40
		 * 	<= Fact $mol_plot_group
		 * 		title <= fact_title @ \Fact
		 * 		series_y <= facts /
		 * 			5
		 * 			10
		 * 			30
		 * 		graphs /
		 * 			<= Fact_line $mol_plot_line
		 * 			<= Fact_dots $mol_plot_dot
		 * 	<= Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \pcs
		 * 	<= Marker_hor $mol_plot_mark_hor
		 * 		title <= marker_hor_title @ \Months
		 * 		labels <= months /string
		 * 			\January
		 * 			\February
		 * 			\March
		 * 			\April
		 * 	<= Marker_cross $mol_plot_mark_cross
		 * 		labels <= months
		 * 		graphs /
		 * 			<= Plan
		 * 			<= Fact_dots
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
		 * 	<= Plan $mol_plot_bar
		 * 		title <= plan_title @ \Plan
		 * 		series_y <= plan /
		 * 			10
		 * 			20
		 * 			30
		 * 			40
		 * 	<= Fact $mol_plot_group
		 * 		title <= fact_title @ \Fact
		 * 		series_y <= facts /
		 * 			5
		 * 			10
		 * 			30
		 * 		graphs /
		 * 			<= Fact_line $mol_plot_line
		 * 			<= Fact_dots $mol_plot_dot
		 * 	<= Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \pcs
		 * 	<= Marker_hor $mol_plot_mark_hor
		 * 		title <= marker_hor_title @ \Months
		 * 		labels <= months /string
		 * 			\January
		 * 			\February
		 * 			\March
		 * 			\April
		 * 	<= Marker_cross $mol_plot_mark_cross
		 * 		labels <= months
		 * 		graphs /
		 * 			<= Plan
		 * 			<= Fact_dots
		 * ```
		 */
		@ $mol_mem
		Chart() {
			const obj = new this.$.$mol_chart()

			obj.graphs = () => [
				this.Plan(),
				this.Fact(),
				this.Vert_ruler(),
				this.Marker_hor(),
				this.Marker_cross()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Plan $mol_plot_bar
		 * 	title <= plan_title @ \Plan
		 * 	series_y <= plan /
		 * 		10
		 * 		20
		 * 		30
		 * 		40
		 * ```
		 */
		@ $mol_mem
		Plan() {
			const obj = new this.$.$mol_plot_bar()

			obj.title = () => this.plan_title()
			obj.series_y = () => this.plan()

			return obj
		}

		/**
		 * ```tree
		 * plan_title @ \Plan
		 * ```
		 */
		plan_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_simple_plan_title' )
		}

		/**
		 * ```tree
		 * plan /
		 * 	10
		 * 	20
		 * 	30
		 * 	40
		 * ```
		 */
		plan() {
			return [
				10,
				20,
				30,
				40
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Fact $mol_plot_group
		 * 	title <= fact_title @ \Fact
		 * 	series_y <= facts /
		 * 		5
		 * 		10
		 * 		30
		 * 	graphs /
		 * 		<= Fact_line $mol_plot_line
		 * 		<= Fact_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Fact() {
			const obj = new this.$.$mol_plot_group()

			obj.title = () => this.fact_title()
			obj.series_y = () => this.facts()
			obj.graphs = () => [
				this.Fact_line(),
				this.Fact_dots()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * fact_title @ \Fact
		 * ```
		 */
		fact_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_simple_fact_title' )
		}

		/**
		 * ```tree
		 * facts /
		 * 	5
		 * 	10
		 * 	30
		 * ```
		 */
		facts() {
			return [
				5,
				10,
				30
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Fact_line $mol_plot_line
		 * ```
		 */
		@ $mol_mem
		Fact_line() {
			const obj = new this.$.$mol_plot_line()

			return obj
		}

		/**
		 * ```tree
		 * Fact_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Fact_dots() {
			const obj = new this.$.$mol_plot_dot()

			return obj
		}

		/**
		 * ```tree
		 * Vert_ruler $mol_plot_ruler_vert title <= vert_title @ \pcs
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
		 * vert_title @ \pcs
		 * ```
		 */
		vert_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_simple_vert_title' )
		}

		/**
		 * ```tree
		 * Marker_hor $mol_plot_mark_hor
		 * 	title <= marker_hor_title @ \Months
		 * 	labels <= months /string
		 * 		\January
		 * 		\February
		 * 		\March
		 * 		\April
		 * ```
		 */
		@ $mol_mem
		Marker_hor() {
			const obj = new this.$.$mol_plot_mark_hor()

			obj.title = () => this.marker_hor_title()
			obj.labels = () => this.months()

			return obj
		}

		/**
		 * ```tree
		 * marker_hor_title @ \Months
		 * ```
		 */
		marker_hor_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_simple_marker_hor_title' )
		}

		/**
		 * ```tree
		 * months /string
		 * 	\January
		 * 	\February
		 * 	\March
		 * 	\April
		 * ```
		 */
		months() {
			return [
				"January",
				"February",
				"March",
				"April"
			] as readonly string[]
		}

		/**
		 * ```tree
		 * Marker_cross $mol_plot_mark_cross
		 * 	labels <= months
		 * 	graphs /
		 * 		<= Plan
		 * 		<= Fact_dots
		 * ```
		 */
		@ $mol_mem
		Marker_cross() {
			const obj = new this.$.$mol_plot_mark_cross()

			obj.labels = () => this.months()
			obj.graphs = () => [
				this.Plan(),
				this.Fact_dots()
			] as readonly any[]

			return obj
		}
	}

}
