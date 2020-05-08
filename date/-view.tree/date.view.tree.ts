namespace $ { export class $mol_date extends $mol_pop {

	/**
	 *  ```
	 *  Anchor <= Input
	 *  ```
	 **/
	Anchor() {
		return this.Input()
	}

	/**
	 *  ```
	 *  Input $mol_string
	 *  	value?val <=> value?val
	 *  	hint <= hint
	 *  	enabled <= enabled
	 *  	length_max 10
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.value( val )
			obj.hint = () => this.hint()
			obj.enabled = () => this.enabled()
			obj.length_max = () => 10
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  value?val \
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  hint \YYYY-MM-DD
	 *  ```
	 **/
	hint() {
		return "YYYY-MM-DD"
	}

	/**
	 *  ```
	 *  enabled true
	 *  ```
	 **/
	enabled() {
		return true
	}

	/**
	 *  ```
	 *  bubble_content / <= Calendar
	 *  ```
	 **/
	bubble_content() {
		return [this.Calendar()] as readonly any[]
	}

	/**
	 *  ```
	 *  Calendar $mol_date_calendar
	 *  	month_string <= value
	 *  	day_selected!day <= day_selected!day
	 *  	day_click!day?event <=> day_click!day?event
	 *  ```
	 **/
	@ $mol_mem
	Calendar() {
		return (( obj )=>{
			obj.month_string = () => this.value()
			obj.day_selected = ( day : any ) => this.day_selected(day)
			obj.day_click = ( day : any , event? : any ) => this.day_click(day , event )
			return obj
		})( new this.$.$mol_date_calendar(  ) )
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
	 *  day_click!day?event null
	 *  ```
	 **/
	@ $mol_mem_key
	day_click( day : any , event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  value_number?val NaN
	 *  ```
	 **/
	@ $mol_mem
	value_number( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/**
	 *  ```
	 *  value_moment?val $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem
	value_moment( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

} }
namespace $ { export class $mol_date_calendar extends $mol_calendar {

	/**
	 *  ```
	 *  day_content!day / <= Day_button!day
	 *  ```
	 **/
	day_content( day : any ) {
		return [this.Day_button(day)] as readonly any[]
	}

	/**
	 *  ```
	 *  Day_button!day $mol_button
	 *  	title <= day_text!day
	 *  	event_click?event <=> day_click!day?event
	 *  ```
	 **/
	@ $mol_mem_key
	Day_button( day : any ) {
		return (( obj )=>{
			obj.title = () => this.day_text(day)
			obj.event_click = ( event? : any ) => this.day_click(day , event )
			return obj
		})( new this.$.$mol_button(  ) )
	}

	/**
	 *  ```
	 *  day_click!day?event null
	 *  ```
	 **/
	@ $mol_mem_key
	day_click( day : any , event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }
