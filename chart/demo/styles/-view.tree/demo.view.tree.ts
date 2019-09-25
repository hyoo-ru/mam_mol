namespace $ { export class $mol_chart_demo_styles extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Chart with various styles of graphs.
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_title" )
	}

	/**
	 *  ```
	 *  samples_count 15
	 *  ```
	 **/
	samples_count() {
		return 15
	}

	/**
	 *  ```
	 *  sub / <= Chart
	 *  ```
	 **/
	sub() {
		return [].concat( this.Chart() )
	}

	/**
	 *  ```
	 *  Chart $mol_chart graphs <= graphs
	 *  ```
	 **/
	@ $mol_mem
	Chart() {
		return (( obj )=>{
			obj.graphs = () => this.graphs()
			return obj
		})( new this.$.$mol_chart(  ) )
	}

	/**
	 *  ```
	 *  graphs /
	 *  	<= Receipts
	 *  	<= Receipts_confirmed
	 *  	<= Maximum
	 *  	<= Waste
	 *  	<= Purchases
	 *  	<= Taxes
	 *  	<= Energy
	 *  	<= Day
	 *  ```
	 **/
	graphs() {
		return [].concat( this.Receipts() , this.Receipts_confirmed() , this.Maximum() , this.Waste() , this.Purchases() , this.Taxes() , this.Energy() , this.Day() )
	}

	/**
	 *  ```
	 *  Receipts $mol_plot_bar
	 *  	title <= receipts_title
	 *  	series_x <= series_x
	 *  	series_y <= series_2_y
	 *  ```
	 **/
	@ $mol_mem
	Receipts() {
		return (( obj )=>{
			obj.title = () => this.receipts_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_2_y()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  receipts_title @ \Receipts
	 *  ```
	 **/
	receipts_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_receipts_title" )
	}

	/**
	 *  ```
	 *  series_x /
	 *  ```
	 **/
	series_x() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  series_2_y /
	 *  ```
	 **/
	series_2_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Receipts_confirmed $mol_plot_bar
	 *  	title <= receipts_confirmed_title
	 *  	series_x <= series_x
	 *  	series_y <= series_3_y
	 *  ```
	 **/
	@ $mol_mem
	Receipts_confirmed() {
		return (( obj )=>{
			obj.title = () => this.receipts_confirmed_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_3_y()
			return obj
		})( new this.$.$mol_plot_bar(  ) )
	}

	/**
	 *  ```
	 *  receipts_confirmed_title @ \Confirmed receipts
	 *  ```
	 **/
	receipts_confirmed_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_receipts_confirmed_title" )
	}

	/**
	 *  ```
	 *  series_3_y /
	 *  ```
	 **/
	series_3_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Maximum $mol_plot_dot
	 *  	title <= maximum_title
	 *  	series_x <= series_x
	 *  	series_y <= series_1_y
	 *  ```
	 **/
	@ $mol_mem
	Maximum() {
		return (( obj )=>{
			obj.title = () => this.maximum_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_1_y()
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  maximum_title @ \Maximum
	 *  ```
	 **/
	maximum_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_maximum_title" )
	}

	/**
	 *  ```
	 *  series_1_y /
	 *  ```
	 **/
	series_1_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Waste $mol_plot_line
	 *  	type \dashed
	 *  	title <= waste_title
	 *  	series_x <= series_x
	 *  	series_y <= series_4_y
	 *  ```
	 **/
	@ $mol_mem
	Waste() {
		return (( obj )=>{
			obj.type = () => "dashed"
			obj.title = () => this.waste_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_4_y()
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  waste_title @ \Waste
	 *  ```
	 **/
	waste_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_waste_title" )
	}

	/**
	 *  ```
	 *  series_4_y /
	 *  ```
	 **/
	series_4_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Purchases $mol_plot_group
	 *  	title <= purchases_title
	 *  	series_x <= series_x
	 *  	series_y <= series_5_y
	 *  	graphs /
	 *  		<= Purchases_fill
	 *  		<= Purchases_line
	 *  		<= Purchases_dots
	 *  ```
	 **/
	@ $mol_mem
	Purchases() {
		return (( obj )=>{
			obj.title = () => this.purchases_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_5_y()
			obj.graphs = () => [].concat( this.Purchases_fill() , this.Purchases_line() , this.Purchases_dots() )
			return obj
		})( new this.$.$mol_plot_group(  ) )
	}

	/**
	 *  ```
	 *  purchases_title @ \Purchases
	 *  ```
	 **/
	purchases_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_purchases_title" )
	}

	/**
	 *  ```
	 *  series_5_y /
	 *  ```
	 **/
	series_5_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Purchases_fill $mol_plot_fill
	 *  ```
	 **/
	@ $mol_mem
	Purchases_fill() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_fill(  ) )
	}

	/**
	 *  ```
	 *  Purchases_line $mol_plot_line
	 *  ```
	 **/
	@ $mol_mem
	Purchases_line() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  Purchases_dots $mol_plot_dot
	 *  ```
	 **/
	@ $mol_mem
	Purchases_dots() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  Taxes $mol_plot_group
	 *  	title <= taxes_title
	 *  	series_x <= series_x
	 *  	series_y <= series_6_y
	 *  	graphs /
	 *  		<= Taxes_fill
	 *  		<= Taxes_line
	 *  		<= Taxes_dots
	 *  ```
	 **/
	@ $mol_mem
	Taxes() {
		return (( obj )=>{
			obj.title = () => this.taxes_title()
			obj.series_x = () => this.series_x()
			obj.series_y = () => this.series_6_y()
			obj.graphs = () => [].concat( this.Taxes_fill() , this.Taxes_line() , this.Taxes_dots() )
			return obj
		})( new this.$.$mol_plot_group(  ) )
	}

	/**
	 *  ```
	 *  taxes_title @ \Taxes
	 *  ```
	 **/
	taxes_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_taxes_title" )
	}

	/**
	 *  ```
	 *  series_6_y /
	 *  ```
	 **/
	series_6_y() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Taxes_fill $mol_plot_fill
	 *  ```
	 **/
	@ $mol_mem
	Taxes_fill() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_fill(  ) )
	}

	/**
	 *  ```
	 *  Taxes_line $mol_plot_line type \dashed
	 *  ```
	 **/
	@ $mol_mem
	Taxes_line() {
		return (( obj )=>{
			obj.type = () => "dashed"
			return obj
		})( new this.$.$mol_plot_line(  ) )
	}

	/**
	 *  ```
	 *  Taxes_dots $mol_plot_dot
	 *  ```
	 **/
	@ $mol_mem
	Taxes_dots() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_plot_dot(  ) )
	}

	/**
	 *  ```
	 *  Energy $mol_plot_ruler_vert title <= energy_title
	 *  ```
	 **/
	@ $mol_mem
	Energy() {
		return (( obj )=>{
			obj.title = () => this.energy_title()
			return obj
		})( new this.$.$mol_plot_ruler_vert(  ) )
	}

	/**
	 *  ```
	 *  energy_title @ \kJ
	 *  ```
	 **/
	energy_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_energy_title" )
	}

	/**
	 *  ```
	 *  Day $mol_plot_mark_hor
	 *  	title <= day_title
	 *  	series_x <= series_x
	 *  ```
	 **/
	@ $mol_mem
	Day() {
		return (( obj )=>{
			obj.title = () => this.day_title()
			obj.series_x = () => this.series_x()
			return obj
		})( new this.$.$mol_plot_mark_hor(  ) )
	}

	/**
	 *  ```
	 *  day_title @ \Day
	 *  ```
	 **/
	day_title() {
		return this.$.$mol_locale.text( "$mol_chart_demo_styles_day_title" )
	}

} }

