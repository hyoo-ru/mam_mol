namespace $ {
	export class $mol_calendar extends $mol_list {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= Weekdays
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Weekdays()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * weeks /$mol_view
		 * ```
		 */
		weeks() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * weeks_count 6
		 * ```
		 */
		weeks_count() {
			return 6
		}
		
		/**
		 * ```tree
		 * Weekday* $mol_calendar_day
		 * 	holiday <= weekend*
		 * 	sub / <= weekday*
		 * ```
		 */
		@ $mol_mem_key
		Weekday(id: any) {
			const obj = new this.$.$mol_calendar_day()
			
			obj.holiday = () => this.weekend(id)
			obj.sub = () => [
				this.weekday(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Week* $mol_hor sub <= week_days*
		 * ```
		 */
		@ $mol_mem_key
		Week(id: any) {
			const obj = new this.$.$mol_hor()
			
			obj.sub = () => this.week_days(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Day* $mol_calendar_day
		 * 	ghost <= day_ghost*
		 * 	holiday <= day_holiday*
		 * 	selected <= day_selected*
		 * 	today <= day_today*
		 * 	theme <= day_theme*
		 * 	sub <= day_content*
		 * ```
		 */
		@ $mol_mem_key
		Day(id: any) {
			const obj = new this.$.$mol_calendar_day()
			
			obj.ghost = () => this.day_ghost(id)
			obj.holiday = () => this.day_holiday(id)
			obj.selected = () => this.day_selected(id)
			obj.today = () => this.day_today(id)
			obj.theme = () => this.day_theme(id)
			obj.sub = () => this.day_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * month_string \
		 * ```
		 */
		month_string() {
			return ""
		}
		
		/**
		 * ```tree
		 * month_moment $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		month_moment() {
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
		
		/**
		 * ```tree
		 * Title $mol_view
		 * 	minimal_height 24
		 * 	sub / <= title
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_view()
			
			obj.minimal_height = () => 24
			obj.sub = () => [
				this.title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * head / <= Title
		 * ```
		 */
		head() {
			return [
				this.Title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Head $mol_view sub <= head
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.head()
			
			return obj
		}
		
		/**
		 * ```tree
		 * weekdays /$mol_view
		 * ```
		 */
		weekdays() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Weekdays $mol_hor sub <= weekdays
		 * ```
		 */
		@ $mol_mem
		Weekdays() {
			const obj = new this.$.$mol_hor()
			
			obj.sub = () => this.weekdays()
			
			return obj
		}
		
		/**
		 * ```tree
		 * weekend* false
		 * ```
		 */
		weekend(id: any) {
			return false
		}
		
		/**
		 * ```tree
		 * weekday* \
		 * ```
		 */
		weekday(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * week_days* /$mol_view
		 * ```
		 */
		week_days(id: any) {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * day_ghost* false
		 * ```
		 */
		day_ghost(id: any) {
			return false
		}
		
		/**
		 * ```tree
		 * day_holiday* false
		 * ```
		 */
		day_holiday(id: any) {
			return false
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
		 * day_today* false
		 * ```
		 */
		day_today(id: any) {
			return false
		}
		
		/**
		 * ```tree
		 * day_theme* null
		 * ```
		 */
		day_theme(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * day_text* \
		 * ```
		 */
		day_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * day_content* / <= day_text*
		 * ```
		 */
		day_content(id: any) {
			return [
				this.day_text(id)
			] as readonly any[]
		}
	}
	
	export class $mol_calendar_day extends $mol_view {
		
		/**
		 * ```tree
		 * minimal_height 24
		 * ```
		 */
		minimal_height() {
			return 24
		}
		
		/**
		 * ```tree
		 * minimal_width 36
		 * ```
		 */
		minimal_width() {
			return 36
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	mol_calendar_holiday <= holiday
		 * 	mol_calendar_ghost <= ghost
		 * 	mol_calendar_selected <= selected
		 * 	mol_calendar_today <= today
		 * 	mol_theme <= theme
		 * ```
		 */
		attr() {
			return {
				mol_calendar_holiday: this.holiday(),
				mol_calendar_ghost: this.ghost(),
				mol_calendar_selected: this.selected(),
				mol_calendar_today: this.today(),
				mol_theme: this.theme()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * holiday false
		 * ```
		 */
		holiday() {
			return false
		}
		
		/**
		 * ```tree
		 * ghost false
		 * ```
		 */
		ghost() {
			return false
		}
		
		/**
		 * ```tree
		 * selected false
		 * ```
		 */
		selected() {
			return false
		}
		
		/**
		 * ```tree
		 * today false
		 * ```
		 */
		today() {
			return false
		}
		
		/**
		 * ```tree
		 * theme null
		 * ```
		 */
		theme() {
			return null as any
		}
	}
	
}

