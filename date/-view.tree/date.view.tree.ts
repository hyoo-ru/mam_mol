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
		 * 	<= Input_row
		 * 	<= Calendar
		 * ```
		 */
		bubble_content() {
			return [
				this.Input_row(),
				this.Calendar()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value_number? +NaN
		 * ```
		 */
		@ $mol_mem
		value_number(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * value_moment? $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		value_moment(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
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
		 * today_click?event null
		 * ```
		 */
		@ $mol_mem
		today_click(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Today_icon $mol_icon_calendar_today
		 * ```
		 */
		@ $mol_mem
		Today_icon() {
			const obj = new this.$.$mol_icon_calendar_today()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Today $mol_button_minor
		 * 	hint @ \Today
		 * 	enabled <= enabled
		 * 	click?event <=> today_click?event
		 * 	sub / <= Today_icon
		 * ```
		 */
		@ $mol_mem
		Today() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.$.$mol_locale.text( '$mol_date_Today_hint' )
			obj.enabled = () => this.enabled()
			obj.click = (event?: any) => this.today_click(event)
			obj.sub = () => [
				this.Today_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * input_mask* \
		 * ```
		 */
		input_mask(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * value_changed?
		 * ```
		 */
		value_changed(next?: any) {
			return this.Input().value_changed(next)
		}
		
		/**
		 * ```tree
		 * Input $mol_format
		 * 	value? <=> value?
		 * 	value_changed? => value_changed?
		 * 	mask* <= input_mask*
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_format()
			
			obj.value = (next?: any) => this.value(next)
			obj.mask = (id: any) => this.input_mask(id)
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * clear?event null
		 * ```
		 */
		@ $mol_mem
		clear(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Clear_icon $mol_icon_trash_can_outline
		 * ```
		 */
		@ $mol_mem
		Clear_icon() {
			const obj = new this.$.$mol_icon_trash_can_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Clear $mol_button_minor
		 * 	hint @ \Clear
		 * 	enabled <= enabled
		 * 	click?event <=> clear?event
		 * 	sub / <= Clear_icon
		 * ```
		 */
		@ $mol_mem
		Clear() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.$.$mol_locale.text( '$mol_date_Clear_hint' )
			obj.enabled = () => this.enabled()
			obj.click = (event?: any) => this.clear(event)
			obj.sub = () => [
				this.Clear_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * input_content /
		 * 	<= Today
		 * 	<= Input
		 * 	<= Clear
		 * ```
		 */
		input_content() {
			return [
				this.Today(),
				this.Input(),
				this.Clear()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Input_row $mol_view sub <= input_content
		 * ```
		 */
		@ $mol_mem
		Input_row() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.input_content()
			
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
		 * 	enabled <= enabled
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
			
			obj.enabled = () => this.enabled()
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
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * Day_button* $mol_button_minor
		 * 	title <= day_text*
		 * 	event_click?event <=> day_click*?event
		 * 	minimal_height 24
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem_key
		Day_button(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.day_text(id)
			obj.event_click = (event?: any) => this.day_click(id, event)
			obj.minimal_height = () => 24
			obj.enabled = () => this.enabled()
			
			return obj
		}
	}
	
}

