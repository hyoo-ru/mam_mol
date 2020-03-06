namespace $ { export class $mol_plot_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Dynamic lightweight graphs
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_plot_demo_title" )
	}

	/**
	 *  ```
	 *  count?val 20
	 *  ```
	 **/
	@ $mol_mem
	count( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 20
	}

	/**
	 *  ```
	 *  sub / <= Plot
	 *  ```
	 **/
	sub() {
		return [ this.Plot() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Plot $mol_plot_pane graphs /
	 *  	<= Saturation
	 *  	<= Input
	 *  	<= Output
	 *  	<= Voltage
	 *  	<= Time
	 *  ```
	 **/
	@ $mol_mem
	Plot() {
		return (( obj )=>{
			obj.graphs = () => [ this.Saturation() , this.Input() , this.Output() , this.Voltage() , this.Time() ] as readonly any[]
			return obj
		})( new this.$.$mol_plot_pane(  ) )
	}

	/**
	 *  ```
	 *  Saturation $mol_plot_group
	 *  	series_y <= saturation_series
	 *  	graphs /
	 *  		<= Saturation_fill
	 *  		<= Saturation_line
	 *  ```
	 **/
	@ $mol_mem
	Saturation() {
		return (( obj )=>{
			obj.series_y = () => this.saturation_series()
			obj.graphs = () => [ this.Saturation_fill() , this.Saturation_line() ] as readonly any[]
			return obj
		})( new this.$.$mol_plot_group(  ) )
	}

	/**
	 *  ```
	 *  saturation_series /
	 *  ```
	 **/
	saturation_series() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Saturation_fill $mol_plot_fill
	 *  ```
	 **/
	@ $mol_mem
	Saturation_fill() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_fill(  ) )
	}

	/**
	 *  ```
	 *  Saturation_line $mol_plot_line type \dashed
	 *  ```
	 **/
	@ $mol_mem
	Saturation_line() {
		return (( obj )=>{
			obj.type = () => "dashed"
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  Input $mol_plot_group
	 *  	series_y <= input_series
	 *  	graphs /
	 *  		<= Input_line
	 *  		<= Input_dots
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.series_y = () => this.input_series()
			obj.graphs = () => [ this.Input_line() , this.Input_dots() ] as readonly any[]
			return obj
		})( new this.$.$mol_plot_group(  ) )
	}

	/**
	 *  ```
	 *  input_series /
	 *  ```
	 **/
	input_series() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Input_line $mol_plot_line
	 *  ```
	 **/
	@ $mol_mem
	Input_line() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  Input_dots $mol_plot_dot
	 *  ```
	 **/
	@ $mol_mem
	Input_dots() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  Output $mol_plot_bar series_y <= output_series
	 *  ```
	 **/
	@ $mol_mem
	Output() {
		return (( obj )=>{
			obj.series_y = () => this.output_series()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  output_series /
	 *  ```
	 **/
	output_series() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Voltage $mol_plot_ruler_vert title <= Voltage_title
	 *  ```
	 **/
	@ $mol_mem
	Voltage() {
		return (( obj )=>{
			obj.title = () => this.Voltage_title()
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  Voltage_title @ \V
	 *  ```
	 **/
	Voltage_title() {
		return this.$.$mol_locale.text( "$mol_plot_demo_Voltage_title" )
	}

	/**
	 *  ```
	 *  Time $mol_plot_ruler_hor title <= Time_title
	 *  ```
	 **/
	@ $mol_mem
	Time() {
		return (( obj )=>{
			obj.title = () => this.Time_title()
			return obj
		})( new this.$.$mol_plot_ruler_hor(  ) )
	}

	/**
	 *  ```
	 *  Time_title @ \ms
	 *  ```
	 **/
	Time_title() {
		return this.$.$mol_locale.text( "$mol_plot_demo_Time_title" )
	}

} }

