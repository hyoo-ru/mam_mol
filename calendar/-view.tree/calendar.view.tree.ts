namespace $ { export class $mol_calendar extends $mol_list {

	/**
	 *  ```
	 *  sub /
	 *  	<= Title
	 *  	<= Weekdays
	 *  ```
	 **/
	sub() {
		return [this.Title() , this.Weekdays()] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_view
	 *  	minimal_height 24
	 *  	sub / <= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.minimal_height = () => 24
			obj.sub = () => [this.title()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

	/**
	 *  ```
	 *  Weekdays $mol_hor sub <= weekdays
	 *  ```
	 **/
	@ $mol_mem
	Weekdays() {
		return (( obj )=>{
			obj.sub = () => this.weekdays()
			return obj
		})( new this.$.$mol_hor(  ) )
	}

	/**
	 *  ```
	 *  weekdays /$mol_view
	 *  ```
	 **/
	weekdays() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  weeks /$mol_view
	 *  ```
	 **/
	weeks() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Weekday!index $mol_calendar_day
	 *  	holiday <= weekend!index
	 *  	sub / <= weekday!index
	 *  ```
	 **/
	@ $mol_mem_key
	Weekday( index : any ) {
		return (( obj )=>{
			obj.holiday = () => this.weekend(index)
			obj.sub = () => [this.weekday(index)] as readonly any[]
			return obj
		})( new this.$.$mol_calendar_day(  ) )
	}

	/**
	 *  ```
	 *  weekend!index false
	 *  ```
	 **/
	weekend( index : any ) {
		return false
	}

	/**
	 *  ```
	 *  weekday!index \
	 *  ```
	 **/
	weekday( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Week!row $mol_hor sub <= week_days!row
	 *  ```
	 **/
	@ $mol_mem_key
	Week( row : any ) {
		return (( obj )=>{
			obj.sub = () => this.week_days(row)
			return obj
		})( new this.$.$mol_hor(  ) )
	}

	/**
	 *  ```
	 *  week_days!row /$mol_view
	 *  ```
	 **/
	week_days( row : any ) {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Day!day $mol_calendar_day
	 *  	ghost <= day_ghost!day
	 *  	holiday <= day_holiday!day
	 *  	selected <= day_selected!day
	 *  	sub <= day_content!day
	 *  ```
	 **/
	@ $mol_mem_key
	Day( day : any ) {
		return (( obj )=>{
			obj.ghost = () => this.day_ghost(day)
			obj.holiday = () => this.day_holiday(day)
			obj.selected = () => this.day_selected(day)
			obj.sub = () => this.day_content(day)
			return obj
		})( new this.$.$mol_calendar_day(  ) )
	}

	/**
	 *  ```
	 *  day_ghost!day false
	 *  ```
	 **/
	day_ghost( day : any ) {
		return false
	}

	/**
	 *  ```
	 *  day_holiday!day false
	 *  ```
	 **/
	day_holiday( day : any ) {
		return false
	}

	/**
	 *  ```
	 *  day_selected!day false
	 *  ```
	 **/
	day_selected( day : any ) {
		return false
	}

	/**
	 *  ```
	 *  day_content!day / <= day_text!day
	 *  ```
	 **/
	day_content( day : any ) {
		return [this.day_text(day)] as readonly any[]
	}

	/**
	 *  ```
	 *  day_text!day \
	 *  ```
	 **/
	day_text( day : any ) {
		return ""
	}

	/**
	 *  ```
	 *  month_string \
	 *  ```
	 **/
	month_string() {
		return ""
	}

	/**
	 *  ```
	 *  month_moment $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem
	month_moment() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

} }
namespace $ { export class $mol_calendar_day extends $mol_view {

	/**
	 *  ```
	 *  minimal_height 32
	 *  ```
	 **/
	minimal_height() {
		return 32
	}

	/**
	 *  ```
	 *  minimal_width 36
	 *  ```
	 **/
	minimal_width() {
		return 36
	}

	/**
	 *  ```
	 *  attr *
	 *  	mol_calendar_holiday <= holiday
	 *  	mol_calendar_ghost <= ghost
	 *  	mol_calendar_selected <= selected
	 *  ```
	 **/
	attr() {
		return ({
			"mol_calendar_holiday" :  this.holiday() ,
			"mol_calendar_ghost" :  this.ghost() ,
			"mol_calendar_selected" :  this.selected() ,
		})
	}

	/**
	 *  ```
	 *  holiday false
	 *  ```
	 **/
	holiday() {
		return false
	}

	/**
	 *  ```
	 *  ghost false
	 *  ```
	 **/
	ghost() {
		return false
	}

	/**
	 *  ```
	 *  selected false
	 *  ```
	 **/
	selected() {
		return false
	}

} }
