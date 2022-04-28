namespace $ {
	export class $mol_calendar_demo_simple extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Days of curret month
		 * ```
		 */
		title() {
			return "Days of curret month"
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
		 * tags /
		 * 	\calendar
		 * 	\date
		 * ```
		 */
		tags() {
			return [
				"calendar",
				"date"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * today $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		today() {
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Calendar $mol_calendar month_moment <= today
		 * ```
		 */
		@ $mol_mem
		Calendar() {
			const obj = new this.$.$mol_calendar()
			
			obj.month_moment = () => this.today()
			
			return obj
		}
	}
	
}

