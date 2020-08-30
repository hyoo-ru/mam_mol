namespace $ {
	export class $mol_date extends $mol_pop {

		/**
		 * ```tree
		 * Anchor <= Input $mol_string
		 * 	value?val <=> value?val \
		 * 	hint <= hint \YYYY-MM-DD
		 * 	enabled <= enabled true
		 * 	length_max 10
		 * ```
		 */
		Anchor() {
			return this.Input()
		}

		/**
		 * ```tree
		 * Input $mol_string
		 * 	value?val <=> value?val \
		 * 	hint <= hint \YYYY-MM-DD
		 * 	enabled <= enabled true
		 * 	length_max 10
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_string()

			obj.value = (val?: any) => this.value(val)
			obj.hint = () => this.hint()
			obj.enabled = () => this.enabled()
			obj.length_max = () => 10

			return obj
		}

		/**
		 * ```tree
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * hint \YYYY-MM-DD
		 * ```
		 */
		hint() {
			return "YYYY-MM-DD"
		}

		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}


		/**
		 * ```tree
		 * bubble_content / <= Calendar $mol_date_calendar
		 * 	month_string <= value
		 * 	day_selected!day <= day_selected!day false
		 * 	day_click!day?event <=> day_click!day?event null
		 * ```
		 */
		bubble_content() {
			return [
				this.Calendar()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Calendar $mol_date_calendar
		 * 	month_string <= value
		 * 	day_selected!day <= day_selected!day false
		 * 	day_click!day?event <=> day_click!day?event null
		 * ```
		 */
		@ $mol_mem
		Calendar() {
			const obj = new this.$.$mol_date_calendar()

			obj.month_string = () => this.value()
			obj.day_selected = (day: any) => this.day_selected(day)
			obj.day_click = (day: any, event?: any) => this.day_click(day, event)

			return obj
		}

		/**
		 * ```tree
		 * day_selected!day false
		 * ```
		 */
		day_selected(day: any) {
			return false
		}

		/**
		 * ```tree
		 * day_click!day?event null
		 * ```
		 */
		@ $mol_mem_key
		day_click(day: any, event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}


		/**
		 * ```tree
		 * value_number?val NaN
		 * ```
		 */
		@ $mol_mem
		value_number(val?: any) {
			if ( val !== undefined ) return val
			return NaN
		}

		/**
		 * ```tree
		 * value_moment?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		value_moment(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_time_moment()

			return obj
		}
	}

	export class $mol_date_calendar extends $mol_calendar {

		/**
		 * ```tree
		 * day_content!day / <= Day_button!day $mol_button
		 * 	title <= day_text!day
		 * 	event_click?event <=> day_click!day?event null
		 * ```
		 */
		day_content(day: any) {
			return [
				this.Day_button(day)
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Day_button!day $mol_button
		 * 	title <= day_text!day
		 * 	event_click?event <=> day_click!day?event null
		 * ```
		 */
		@ $mol_mem_key
		Day_button(day: any) {
			const obj = new this.$.$mol_button()

			obj.title = () => this.day_text(day)
			obj.event_click = (event?: any) => this.day_click(day, event)

			return obj
		}

		/**
		 * ```tree
		 * day_click!day?event null
		 * ```
		 */
		@ $mol_mem_key
		day_click(day: any, event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
