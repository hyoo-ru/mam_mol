namespace $ { export class $mol_chart_demo_simple extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Simple chart with hadcoded series
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_simple_title" )
	}

	/**
	 *  ```
	 *  sub / <= Chart
	 *  ```
	 **/
	sub() {
		return [this.Chart()] as readonly any[]
	}

	/**
	 *  ```
	 *  Chart $mol_chart graphs /
	 *  	<= Plan
	 *  	<= Fact
	 *  	<= Vert_ruler
	 *  	<= Marker_hor
	 *  	<= Marker_cross
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.graphs = () => [this.Plan() , this.Fact() , this.Vert_ruler() , this.Marker_hor() , this.Marker_cross()] as readonly any[]
			return obj
		})( new this.$.$mol_chart(  ) )
	}

	/**
	 *  ```
	 *  Plan $mol_plot_bar
	 *  	title <= plan_title
	 *  	series_y <= plan
	 *  ```
	 **/
	@ $mol_mem
	Plan() {
		return (( obj )=>{
			obj.title = () => this.plan_title()
			obj.series_y = () => this.plan()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  plan_title @ \Plan
	 *  ```
	 **/
	plan_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_simple_plan_title" )
	}

	/**
	 *  ```
	 *  plan /
	 *  	10
	 *  	20
	 *  	30
	 *  	40
	 *  ```
	 **/
	plan() {
		return [10 , 20 , 30 , 40] as readonly any[]
	}

	/**
	 *  ```
	 *  Fact $mol_plot_group
	 *  	title <= fact_title
	 *  	series_y <= facts
	 *  	graphs /
	 *  		<= Fact_line
	 *  		<= Fact_dots
	 *  ```
	 **/
	@ $mol_mem
	Fact() {
		return (( obj )=>{
			obj.title = () => this.fact_title()
			obj.series_y = () => this.facts()
			obj.graphs = () => [this.Fact_line() , this.Fact_dots()] as readonly any[]
			return obj
		})( new this.$.$mol_plot_group(  ) )
	}

	/**
	 *  ```
	 *  fact_title @ \Fact
	 *  ```
	 **/
	fact_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_simple_fact_title" )
	}

	/**
	 *  ```
	 *  facts /
	 *  	5
	 *  	10
	 *  	30
	 *  ```
	 **/
	facts() {
		return [5 , 10 , 30] as readonly any[]
	}

	/**
	 *  ```
	 *  Fact_line $mol_plot_line
	 *  ```
	 **/
	@ $mol_mem
	Fact_line() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  Fact_dots $mol_plot_dot
	 *  ```
	 **/
	@ $mol_mem
	Fact_dots() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  Vert_ruler $mol_plot_ruler_vert title <= vert_title
	 *  ```
	 **/
	@ $mol_mem
	Vert_ruler() {
		return (( obj )=>{
			obj.title = () => this.vert_title()
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  vert_title @ \pcs
	 *  ```
	 **/
	vert_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_simple_vert_title" )
	}

	/**
	 *  ```
	 *  Marker_hor $mol_plot_mark_hor
	 *  	title <= marker_hor_title
	 *  	labels <= months
	 *  ```
	 **/
	@ $mol_mem
	Marker_hor() {
		return (( obj )=>{
			obj.title = () => this.marker_hor_title()
			obj.labels = () => this.months()
			return obj
		})( new this.$.$mol_plot_mark_hor(  ) )
	}

	/**
	 *  ```
	 *  marker_hor_title @ \Months
	 *  ```
	 **/
	marker_hor_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_simple_marker_hor_title" )
	}

	/**
	 *  ```
	 *  months /string
	 *  	\January
	 *  	\February
	 *  	\March
	 *  	\April
	 *  ```
	 **/
	months() {
		return ["January" , "February" , "March" , "April"] as readonly ( string )[]
	}

	/**
	 *  ```
	 *  Marker_cross $mol_plot_mark_cross
	 *  	labels <= months
	 *  	graphs /
	 *  		<= Plan
	 *  		<= Fact_dots
	 *  ```
	 **/
	@ $mol_mem
	Marker_cross() {
		return (( obj )=>{
			obj.labels = () => this.months()
			obj.graphs = () => [this.Plan() , this.Fact_dots()] as readonly any[]
			return obj
		})( new this.$.$mol_plot_mark_cross(  ) )
	}

} }
