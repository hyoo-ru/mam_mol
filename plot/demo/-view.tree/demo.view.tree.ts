namespace $ {
	export class $mol_plot_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Dynamic lightweight graphs
		 * ```
		 */
		title() {
			return "Dynamic lightweight graphs"
		}
		
		/**
		 * ```tree
		 * count? 20
		 * ```
		 */
		@ $mol_mem
		count(next?: any) {
			if ( next !== undefined ) return next as never
			return 20
		}
		
		/**
		 * ```tree
		 * frequency 8
		 * ```
		 */
		frequency() {
			return 8
		}
		
		/**
		 * ```tree
		 * sub / <= Plot
		 * ```
		 */
		sub() {
			return [
				this.Plot()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\visualization
		 * 	\chart
		 * 	\graph
		 * 	\dashboard
		 * ```
		 */
		tags() {
			return [
				"visualization",
				"chart",
				"graph",
				"dashboard"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Draw/Chart/Line
		 * 	\Widget/Draw/Chart/Fill
		 * 	\Widget/Draw/Chart/Dot
		 * ```
		 */
		aspects() {
			return [
				"Widget/Draw/Chart/Line",
				"Widget/Draw/Chart/Fill",
				"Widget/Draw/Chart/Dot"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * saturation_series /
		 * ```
		 */
		saturation_series() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Saturation_fill $mol_plot_fill
		 * ```
		 */
		@ $mol_mem
		Saturation_fill() {
			const obj = new this.$.$mol_plot_fill()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Saturation_line $mol_plot_line type \dashed
		 * ```
		 */
		@ $mol_mem
		Saturation_line() {
			const obj = new this.$.$mol_plot_line()
			
			obj.type = () => "dashed"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Saturation $mol_plot_group
		 * 	series_y <= saturation_series
		 * 	graphs /
		 * 		<= Saturation_fill
		 * 		<= Saturation_line
		 * ```
		 */
		@ $mol_mem
		Saturation() {
			const obj = new this.$.$mol_plot_group()
			
			obj.series_y = () => this.saturation_series()
			obj.graphs = () => [
				this.Saturation_fill(),
				this.Saturation_line()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * input_series /
		 * ```
		 */
		input_series() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Input_line $mol_plot_line
		 * ```
		 */
		@ $mol_mem
		Input_line() {
			const obj = new this.$.$mol_plot_line()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Input_dots $mol_plot_dot
		 * ```
		 */
		@ $mol_mem
		Input_dots() {
			const obj = new this.$.$mol_plot_dot()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Input $mol_plot_group
		 * 	series_y <= input_series
		 * 	graphs /
		 * 		<= Input_line
		 * 		<= Input_dots
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_plot_group()
			
			obj.series_y = () => this.input_series()
			obj.graphs = () => [
				this.Input_line(),
				this.Input_dots()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * output_series /
		 * ```
		 */
		output_series() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Output $mol_plot_bar series_y <= output_series
		 * ```
		 */
		@ $mol_mem
		Output() {
			const obj = new this.$.$mol_plot_bar()
			
			obj.series_y = () => this.output_series()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Voltage_title \V
		 * ```
		 */
		Voltage_title() {
			return "V"
		}
		
		/**
		 * ```tree
		 * Voltage $mol_plot_ruler_vert title <= Voltage_title
		 * ```
		 */
		@ $mol_mem
		Voltage() {
			const obj = new this.$.$mol_plot_ruler_vert()
			
			obj.title = () => this.Voltage_title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Time_title \ms
		 * ```
		 */
		Time_title() {
			return "ms"
		}
		
		/**
		 * ```tree
		 * Time $mol_plot_ruler_hor title <= Time_title
		 * ```
		 */
		@ $mol_mem
		Time() {
			const obj = new this.$.$mol_plot_ruler_hor()
			
			obj.title = () => this.Time_title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Plot $mol_plot_pane graphs /
		 * 	<= Saturation
		 * 	<= Input
		 * 	<= Output
		 * 	<= Voltage
		 * 	<= Time
		 * ```
		 */
		@ $mol_mem
		Plot() {
			const obj = new this.$.$mol_plot_pane()
			
			obj.graphs = () => [
				this.Saturation(),
				this.Input(),
				this.Output(),
				this.Voltage(),
				this.Time()
			] as readonly any[]
			
			return obj
		}
	}
	
}

