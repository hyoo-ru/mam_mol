namespace $ {
	export class $mol_chart_demo_styles extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Chart with various styles of graphs.
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_title' )
		}

		/**
		 * ```tree
		 * samples_count 15
		 * ```
		 */
		samples_count() {
			return 15
		}

		/**
		 * ```tree
		 * sub / <= Chart $mol_chart graphs <= graphs /
		 * 	<= Receipts $mol_plot_bar
		 * 		title <= receipts_title @ \Receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_2_y /number
		 * 	<= Receipts_confirmed $mol_plot_bar
		 * 		title <= receipts_confirmed_title @ \Confirmed receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_3_y /number
		 * 	<= Maximum $mol_plot_dot
		 * 		title <= maximum_title @ \Maximum
		 * 		series_x <= series_x /number
		 * 		series_y <= series_1_y /number
		 * 	<= Waste $mol_plot_line
		 * 		type \dashed
		 * 		title <= waste_title @ \Waste
		 * 		series_x <= series_x /number
		 * 		series_y <= series_4_y /number
		 * 	<= Purchases $mol_plot_group
		 * 		title <= purchases_title @ \Purchases
		 * 		series_x <= series_x /number
		 * 		series_y <= series_5_y /number
		 * 		graphs /
		 * 			<= Purchases_fill $mol_plot_fill
		 * 			<= Purchases_line $mol_plot_line
		 * 			<= Purchases_dots $mol_plot_dot
		 * 	<= Taxes $mol_plot_group
		 * 		title <= taxes_title @ \Taxes
		 * 		series_x <= series_x /number
		 * 		series_y <= series_6_y /number
		 * 		graphs /
		 * 			<= Taxes_fill $mol_plot_fill
		 * 			<= Taxes_line $mol_plot_line type \dashed
		 * 			<= Taxes_dots $mol_plot_dot
		 * 	<= Energy $mol_plot_ruler_vert title <= energy_title @ \kJ
		 * 	<= Day $mol_plot_mark_hor
		 * 		title <= day_title @ \Day
		 * 		series_x <= series_x /number
		 * ```
		 */
		sub() {
			return [
				this.Chart()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Chart $mol_chart graphs <= graphs /
		 * 	<= Receipts $mol_plot_bar
		 * 		title <= receipts_title @ \Receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_2_y /number
		 * 	<= Receipts_confirmed $mol_plot_bar
		 * 		title <= receipts_confirmed_title @ \Confirmed receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_3_y /number
		 * 	<= Maximum $mol_plot_dot
		 * 		title <= maximum_title @ \Maximum
		 * 		series_x <= series_x /number
		 * 		series_y <= series_1_y /number
		 * 	<= Waste $mol_plot_line
		 * 		type \dashed
		 * 		title <= waste_title @ \Waste
		 * 		series_x <= series_x /number
		 * 		series_y <= series_4_y /number
		 * 	<= Purchases $mol_plot_group
		 * 		title <= purchases_title @ \Purchases
		 * 		series_x <= series_x /number
		 * 		series_y <= series_5_y /number
		 * 		graphs /
		 * 			<= Purchases_fill $mol_plot_fill
		 * 			<= Purchases_line $mol_plot_line
		 * 			<= Purchases_dots $mol_plot_dot
		 * 	<= Taxes $mol_plot_group
		 * 		title <= taxes_title @ \Taxes
		 * 		series_x <= series_x /number
		 * 		series_y <= series_6_y /number
		 * 		graphs /
		 * 			<= Taxes_fill $mol_plot_fill
		 * 			<= Taxes_line $mol_plot_line type \dashed
		 * 			<= Taxes_dots $mol_plot_dot
		 * 	<= Energy $mol_plot_ruler_vert title <= energy_title @ \kJ
		 * 	<= Day $mol_plot_mark_hor
		 * 		title <= day_title @ \Day
		 * 		series_x <= series_x /number
		 * ```
		 */
		@ $mol_mem
		Chart() {
			const obj = new this.$.$mol_chart()

			obj.graphs = () => this.graphs()

			return obj
		}

		/**
		 * ```tree
		 * graphs /
		 * 	<= Receipts $mol_plot_bar
		 * 		title <= receipts_title @ \Receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_2_y /number
		 * 	<= Receipts_confirmed $mol_plot_bar
		 * 		title <= receipts_confirmed_title @ \Confirmed receipts
		 * 		series_x <= series_x /number
		 * 		series_y <= series_3_y /number
		 * 	<= Maximum $mol_plot_dot
		 * 		title <= maximum_title @ \Maximum
		 * 		series_x <= series_x /number
		 * 		series_y <= series_1_y /number
		 * 	<= Waste $mol_plot_line
		 * 		type \dashed
		 * 		title <= waste_title @ \Waste
		 * 		series_x <= series_x /number
		 * 		series_y <= series_4_y /number
		 * 	<= Purchases $mol_plot_group
		 * 		title <= purchases_title @ \Purchases
		 * 		series_x <= series_x /number
		 * 		series_y <= series_5_y /number
		 * 		graphs /
		 * 			<= Purchases_fill $mol_plot_fill
		 * 			<= Purchases_line $mol_plot_line
		 * 			<= Purchases_dots $mol_plot_dot
		 * 	<= Taxes $mol_plot_group
		 * 		title <= taxes_title @ \Taxes
		 * 		series_x <= series_x /number
		 * 		series_y <= series_6_y /number
		 * 		graphs /
		 * 			<= Taxes_fill $mol_plot_fill
		 * 			<= Taxes_line $mol_plot_line type \dashed
		 * 			<= Taxes_dots $mol_plot_dot
		 * 	<= Energy $mol_plot_ruler_vert title <= energy_title @ \kJ
		 * 	<= Day $mol_plot_mark_hor
		 * 		title <= day_title @ \Day
		 * 		series_x <= series_x /number
		 * ```
		 */
		graphs() {
			return [
				this.Receipts(),
				this.Receipts_confirmed(),
				this.Maximum(),
				this.Waste(),
				this.Purchases(),
				this.Taxes(),
				this.Energy(),
				this.Day()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Receipts $mol_plot_bar
		 * 	title <= receipts_title @ \Receipts
		 * 	series_x <= series_x /number
		 * 	series_y <= series_2_y /number
		 * ```
		 */
		@ $mol_mem
		Receipts() {
			const obj = new this.$.$mol_plot_bar()

			obj.title = () => this.receipts_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_2_y()

			return obj
		}

		/**
		 * ```tree
		 * receipts_title @ \Receipts
		 * ```
		 */
		receipts_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_receipts_title' )
		}

		/**
		 * ```tree
		 * series_x /number
		 * ```
		 */
		series_x() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * series_2_y /number
		 * ```
		 */
		series_2_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Receipts_confirmed $mol_plot_bar
		 * 	title <= receipts_confirmed_title @ \Confirmed receipts
		 * 	series_x <= series_x /number
		 * 	series_y <= series_3_y /number
		 * ```
		 */
		@ $mol_mem
		Receipts_confirmed() {
			const obj = new this.$.$mol_plot_bar()

			obj.title = () => this.receipts_confirmed_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_3_y()

			return obj
		}

		/**
		 * ```tree
		 * receipts_confirmed_title @ \Confirmed receipts
		 * ```
		 */
		receipts_confirmed_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_receipts_confirmed_title' )
		}

		/**
		 * ```tree
		 * series_3_y /number
		 * ```
		 */
		series_3_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Maximum $mol_plot_dot
		 * 	title <= maximum_title @ \Maximum
		 * 	series_x <= series_x /number
		 * 	series_y <= series_1_y /number
		 * ```
		 */
		@ $mol_mem
		Maximum() {
			const obj = new this.$.$mol_plot_dot()

			obj.title = () => this.maximum_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_1_y()

			return obj
		}

		/**
		 * ```tree
		 * maximum_title @ \Maximum
		 * ```
		 */
		maximum_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_maximum_title' )
		}

		/**
		 * ```tree
		 * series_1_y /number
		 * ```
		 */
		series_1_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Waste $mol_plot_line
		 * 	type \dashed
		 * 	title <= waste_title @ \Waste
		 * 	series_x <= series_x /number
		 * 	series_y <= series_4_y /number
		 * ```
		 */
		@ $mol_mem
		Waste() {
			const obj = new this.$.$mol_plot_line()

			obj.type = () => "dashed"
			obj.title = () => this.waste_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_4_y()

			return obj
		}

		/**
		 * ```tree
		 * waste_title @ \Waste
		 * ```
		 */
		waste_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_waste_title' )
		}

		/**
		 * ```tree
		 * series_4_y /number
		 * ```
		 */
		series_4_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Purchases $mol_plot_group
		 * 	title <= purchases_title @ \Purchases
		 * 	series_x <= series_x /number
		 * 	series_y <= series_5_y /number
		 * 	graphs /
		 * 		<= Purchases_fill $mol_plot_fill
		 * 		<= Purchases_line $mol_plot_line
		 * 		<= Purchases_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Purchases() {
			const obj = new this.$.$mol_plot_group()

			obj.title = () => this.purchases_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_5_y()
			obj.graphs = () => [
				this.Purchases_fill(),
				this.Purchases_line(),
				this.Purchases_dots()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * purchases_title @ \Purchases
		 * ```
		 */
		purchases_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_purchases_title' )
		}

		/**
		 * ```tree
		 * series_5_y /number
		 * ```
		 */
		series_5_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Purchases_fill $mol_plot_fill
		 * ```
		 */
		@ $mol_mem
		Purchases_fill() {
			const obj = new this.$.$mol_plot_fill()

			return obj
		}

		/**
		 * ```tree
		 * Purchases_line $mol_plot_line
		 * ```
		 */
		@ $mol_mem
		Purchases_line() {
			const obj = new this.$.$mol_plot_line()

			return obj
		}

		/**
		 * ```tree
		 * Purchases_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Purchases_dots() {
			const obj = new this.$.$mol_plot_dot()

			return obj
		}

		/**
		 * ```tree
		 * Taxes $mol_plot_group
		 * 	title <= taxes_title @ \Taxes
		 * 	series_x <= series_x /number
		 * 	series_y <= series_6_y /number
		 * 	graphs /
		 * 		<= Taxes_fill $mol_plot_fill
		 * 		<= Taxes_line $mol_plot_line type \dashed
		 * 		<= Taxes_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Taxes() {
			const obj = new this.$.$mol_plot_group()

			obj.title = () => this.taxes_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_6_y()
			obj.graphs = () => [
				this.Taxes_fill(),
				this.Taxes_line(),
				this.Taxes_dots()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * taxes_title @ \Taxes
		 * ```
		 */
		taxes_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_taxes_title' )
		}

		/**
		 * ```tree
		 * series_6_y /number
		 * ```
		 */
		series_6_y() {
			return [

			] as readonly number[]
		}

		/**
		 * ```tree
		 * Taxes_fill $mol_plot_fill
		 * ```
		 */
		@ $mol_mem
		Taxes_fill() {
			const obj = new this.$.$mol_plot_fill()

			return obj
		}

		/**
		 * ```tree
		 * Taxes_line $mol_plot_line type \dashed
		 * ```
		 */
		@ $mol_mem
		Taxes_line() {
			const obj = new this.$.$mol_plot_line()

			obj.type = () => "dashed"

			return obj
		}

		/**
		 * ```tree
		 * Taxes_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Taxes_dots() {
			const obj = new this.$.$mol_plot_dot()

			return obj
		}

		/**
		 * ```tree
		 * Energy $mol_plot_ruler_vert title <= energy_title @ \kJ
		 * ```
		 */
		@ $mol_mem
		Energy() {
			const obj = new this.$.$mol_plot_ruler_vert()

			obj.title = () => this.energy_title()

			return obj
		}

		/**
		 * ```tree
		 * energy_title @ \kJ
		 * ```
		 */
		energy_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_energy_title' )
		}

		/**
		 * ```tree
		 * Day $mol_plot_mark_hor
		 * 	title <= day_title @ \Day
		 * 	series_x <= series_x /number
		 * ```
		 */
		@ $mol_mem
		Day() {
			const obj = new this.$.$mol_plot_mark_hor()

			obj.title = () => this.day_title()
			obj.series_x = () => this.series_x()

			return obj
		}

		/**
		 * ```tree
		 * day_title @ \Day
		 * ```
		 */
		day_title() {
			return this.$.$mol_locale.text( '$mol_chart_demo_styles_day_title' )
		}
	}

}
