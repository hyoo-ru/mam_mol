namespace $ {
	export class $mol_calendar extends $mol_list {

		/**
		 * ```tree
		 * sub /
		 * 	<= Title $mol_view
		 * 		minimal_height 24
		 * 		sub / <= title \
		 * 	<= Weekdays $mol_hor sub <= weekdays /$mol_view
		 * ```
		 */
		sub() {
			return [
				this.Title(),
				this.Weekdays()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Title $mol_view
		 * 	minimal_height 24
		 * 	sub / <= title \
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
		 * title \
		 * ```
		 */
		title() {
			return ""
		}

		/**
		 * ```tree
		 * Weekdays $mol_hor sub <= weekdays /$mol_view
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
		 * weekdays /$mol_view
		 * ```
		 */
		weekdays() {
			return [

			] as readonly $mol_view[]
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
		 * Weekday!index $mol_calendar_day
		 * 	holiday <= weekend!index false
		 * 	sub / <= weekday!index \
		 * ```
		 */
		@ $mol_mem_key
		Weekday(index: any) {
			const obj = new this.$.$mol_calendar_day()

			obj.holiday = () => this.weekend(index)
			obj.sub = () => [
				this.weekday(index)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * weekend!index false
		 * ```
		 */
		weekend(index: any) {
			return false
		}

		/**
		 * ```tree
		 * weekday!index \
		 * ```
		 */
		weekday(index: any) {
			return ""
		}


		/**
		 * ```tree
		 * Week!row $mol_hor sub <= week_days!row /$mol_view
		 * ```
		 */
		@ $mol_mem_key
		Week(row: any) {
			const obj = new this.$.$mol_hor()

			obj.sub = () => this.week_days(row)

			return obj
		}

		/**
		 * ```tree
		 * week_days!row /$mol_view
		 * ```
		 */
		week_days(row: any) {
			return [

			] as readonly $mol_view[]
		}


		/**
		 * ```tree
		 * Day!day $mol_calendar_day
		 * 	ghost <= day_ghost!day false
		 * 	holiday <= day_holiday!day false
		 * 	selected <= day_selected!day false
		 * 	sub <= day_content!day / <= day_text!day \
		 * ```
		 */
		@ $mol_mem_key
		Day(day: any) {
			const obj = new this.$.$mol_calendar_day()

			obj.ghost = () => this.day_ghost(day)
			obj.holiday = () => this.day_holiday(day)
			obj.selected = () => this.day_selected(day)
			obj.sub = () => this.day_content(day)

			return obj
		}

		/**
		 * ```tree
		 * day_ghost!day false
		 * ```
		 */
		day_ghost(day: any) {
			return false
		}

		/**
		 * ```tree
		 * day_holiday!day false
		 * ```
		 */
		day_holiday(day: any) {
			return false
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
		 * day_content!day / <= day_text!day \
		 * ```
		 */
		day_content(day: any) {
			return [
				this.day_text(day)
			] as readonly any[]
		}

		/**
		 * ```tree
		 * day_text!day \
		 * ```
		 */
		day_text(day: any) {
			return ""
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
	}

	export class $mol_calendar_day extends $mol_view {

		/**
		 * ```tree
		 * minimal_height 28
		 * ```
		 */
		minimal_height() {
			return 28
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
		 * 	mol_calendar_holiday <= holiday false
		 * 	mol_calendar_ghost <= ghost false
		 * 	mol_calendar_selected <= selected false
		 * ```
		 */
		attr() {
			return {
				mol_calendar_holiday: this.holiday(),
				mol_calendar_ghost: this.ghost(),
				mol_calendar_selected: this.selected()
			}
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
	}

}
