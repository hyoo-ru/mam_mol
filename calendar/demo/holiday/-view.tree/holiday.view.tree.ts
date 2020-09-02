namespace $ {
	export class $mol_calendar_demo_holiday extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Days of month 2018-01 with custom holidays
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_calendar_demo_holiday_title' )
		}

		/**
		 * ```tree
		 * holidays /
		 * 	\2018-01-01
		 * 	\2018-01-02
		 * 	\2018-01-03
		 * 	\2018-01-04
		 * 	\2018-01-05
		 * 	\2018-01-06
		 * 	\2018-01-07
		 * 	\2018-01-08
		 * 	\2018-01-13
		 * 	\2018-01-14
		 * 	\2018-01-20
		 * 	\2018-01-21
		 * 	\2018-01-27
		 * 	\2018-01-28
		 * ```
		 */
		holidays() {
			return [
				"2018-01-01",
				"2018-01-02",
				"2018-01-03",
				"2018-01-04",
				"2018-01-05",
				"2018-01-06",
				"2018-01-07",
				"2018-01-08",
				"2018-01-13",
				"2018-01-14",
				"2018-01-20",
				"2018-01-21",
				"2018-01-27",
				"2018-01-28"
			] as readonly any[]
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
		 * holiday!day false
		 * ```
		 */
		holiday(day: any) {
			return false
		}

		/**
		 * ```tree
		 * Calendar $mol_calendar
		 * 	month_string <= month
		 * 	day_holiday!day <= holiday!day
		 * ```
		 */
		@ $mol_mem
		Calendar() {
			const obj = new this.$.$mol_calendar()

			obj.month_string = () => this.month()
			obj.day_holiday = (day: any) => this.holiday(day)

			return obj
		}
	}

}
