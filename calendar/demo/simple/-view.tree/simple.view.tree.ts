namespace $ { export class $mol_calendar_demo_simple extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Days of curret month
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_calendar_demo_simple_title" )
	}

	/**
	 *  ```
	 *  sub / <= Calendar
	 *  ```
	 **/
	sub() {
		return [this.Calendar()] as readonly any[]
	}

	/**
	 *  ```
	 *  Calendar $mol_calendar month_moment <= today
	 *  ```
	 **/
	@ $mol_mem
	Calendar() {
		return (( obj )=>{
			obj.month_moment = () => this.today()
			return obj
		})( new this.$.$mol_calendar(  ) )
	}

	/**
	 *  ```
	 *  today $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem
	today() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/calendar/demo/simple/-view.tree/simple.view.tree.map