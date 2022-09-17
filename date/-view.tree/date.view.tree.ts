namespace $ {
	export class $mol_date extends $mol_pick {
		
		/**
		 * ```tree
		 * Icon $mol_icon_calendar
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_calendar()
			
			return obj
		}
		
		/**
		 * ```tree
		 * bubble_content /
		 * 	<= Input
		 * 	<= Calendar
		 * ```
		 */
		bubble_content() {
			return [
				this.Input(),
				this.Calendar()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value_number?val NaN
		 * ```
		 */
		@ $mol_mem
		value_number(val?: any) {
			if ( val !== undefined ) return val as never
			const obj = new this.$.NaN()
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_moment?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		value_moment(val?: any) {
			if ( val !== undefined ) return val as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * input_hint \YYYY-MM-DD hh:mm
		 * ```
		 */
		input_hint() {
			return "YYYY-MM-DD hh:mm"
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
		 * Input $mol_string
		 * 	value?val <=> value?val
		 * 	hint <= input_hint
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_string()
			
			obj.value = (val?: any) => this.value(val)
			obj.hint = () => this.input_hint()
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * month_moment <= value_moment
		 * ```
		 */
		month_moment() {
			return this.value_moment()
		}
		
		/**
		 * ```tree
		 * day_selected* false
		 * ```
		 */
		day_selected(id: any) {
			return false
		}
		
		/**
		 * ```tree
		 * day_click*?event null
		 * ```
		 */
		@ $mol_mem_key
		day_click(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * prev_hint @ \Previous month
		 * ```
		 */
		prev_hint() {
			return this.$.$mol_locale.text( '$mol_date_prev_hint' )
		}
		
		/**
		 * ```tree
		 * prev?event null
		 * ```
		 */
		@ $mol_mem
		prev(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Prev_icon $mol_icon_chevron_left
		 * ```
		 */
		@ $mol_mem
		Prev_icon() {
			const obj = new this.$.$mol_icon_chevron_left()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Prev $mol_button_minor
		 * 	hint <= prev_hint
		 * 	click?event <=> prev?event
		 * 	sub / <= Prev_icon
		 * ```
		 */
		@ $mol_mem
		Prev() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.prev_hint()
			obj.click = (event?: any) => this.prev(event)
			obj.sub = () => [
				this.Prev_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * next_hint @ \Next month
		 * ```
		 */
		next_hint() {
			return this.$.$mol_locale.text( '$mol_date_next_hint' )
		}
		
		/**
		 * ```tree
		 * next?event null
		 * ```
		 */
		@ $mol_mem
		next(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Next_icon $mol_icon_chevron_right
		 * ```
		 */
		@ $mol_mem
		Next_icon() {
			const obj = new this.$.$mol_icon_chevron_right()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Next $mol_button_minor
		 * 	hint <= next_hint
		 * 	click?event <=> next?event
		 * 	sub / <= Next_icon
		 * ```
		 */
		@ $mol_mem
		Next() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.next_hint()
			obj.click = (event?: any) => this.next(event)
			obj.sub = () => [
				this.Next_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Calendar_tools $mol_view sub /
		 * 	<= Prev
		 * 	<= Calendar_title
		 * 	<= Next
		 * ```
		 */
		@ $mol_mem
		Calendar_tools() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Prev(),
				this.Calendar_title(),
				this.Next()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Calendar_title
		 * ```
		 */
		Calendar_title() {
			return this.Calendar().Title()
		}
		
		/**
		 * ```tree
		 * Calendar $mol_date_calendar
		 * 	month_moment <= month_moment
		 * 	day_selected* <= day_selected*
		 * 	day_click*?event <=> day_click*?event
		 * 	Title => Calendar_title
		 * 	head / <= Calendar_tools
		 * ```
		 */
		@ $mol_mem
		Calendar() {
			const obj = new this.$.$mol_date_calendar()
			
			obj.month_moment = () => this.month_moment()
			obj.day_selected = (id: any) => this.day_selected(id)
			obj.day_click = (id: any, event?: any) => this.day_click(id, event)
			obj.head = () => [
				this.Calendar_tools()
			] as readonly any[]
			
			return obj
		}
	}
	
	export class $mol_date_calendar extends $mol_calendar {
		
		/**
		 * ```tree
		 * day_content* / <= Day_button*
		 * ```
		 */
		day_content(id: any) {
			return [
				this.Day_button(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * day_click*?event null
		 * ```
		 */
		@ $mol_mem_key
		day_click(id: any, event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Day_button* $mol_button_minor
		 * 	title <= day_text*
		 * 	event_click?event <=> day_click*?event
		 * 	minimal_height 24
		 * ```
		 */
		@ $mol_mem_key
		Day_button(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.day_text(id)
			obj.event_click = (event?: any) => this.day_click(id, event)
			obj.minimal_height = () => 24
			
			return obj
		}
	}
	
}

