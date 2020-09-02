namespace $ {
	export class $mol_calendar_demo_selection extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Days of month 2018-01 with custom selection
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_calendar_demo_selection_title' )
		}

		/**
		 * ```tree
		 * interval_config *
		 * 	start \2018-01-10
		 * 	end \2018-01-20
		 * ```
		 */
		interval_config() {
			return {
				start: "2018-01-10",
				end: "2018-01-20"
			}
		}

		/**
		 * ```tree
		 * sub / <= Calendar
		 * ```
		 */
		sub() {
			return [
				this.Calendar()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * month \2018-01
		 * ```
		 */
		month() {
			return "2018-01"
		}

		/**
		 * ```tree
		 * selected!day false
		 * ```
		 */
		selected(day: any) {
			return false
		}

		/**
		 * ```tree
		 * Calendar $mol_calendar
		 * 	month_string <= month
		 * 	day_selected!day <= selected!day
		 * ```
		 */
		@ $mol_mem
		Calendar() {
			const obj = new this.$.$mol_calendar()

			obj.month_string = () => this.month()
			obj.day_selected = (day: any) => this.selected(day)

			return obj
		}
	}

}
