namespace $ {
	export class $mol_select_demo_month extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Month picker with filter
		 * ```
		 */
		title() {
			return "Month picker with filter"
		}
		
		/**
		 * ```tree
		 * sub / <= Month
		 * ```
		 */
		sub() {
			return [
				this.Month()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\select
		 * 	\month
		 * ```
		 */
		tags() {
			return [
				"select",
				"month"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * month? \jan
		 * ```
		 */
		@ $mol_mem
		month(next?: any) {
			if ( next !== undefined ) return next as never
			return "jan"
		}
		
		/**
		 * ```tree
		 * months *
		 * 	jan \January
		 * 	feb \February
		 * 	mar \March
		 * 	apr \April
		 * 	may \May
		 * 	jun \June
		 * 	jul \July
		 * 	aug \August
		 * 	sep \September
		 * 	oct \October
		 * 	nov \November
		 * 	dec \December
		 * ```
		 */
		months() {
			return {
				jan: "January",
				feb: "February",
				mar: "March",
				apr: "April",
				may: "May",
				jun: "June",
				jul: "July",
				aug: "August",
				sep: "September",
				oct: "October",
				nov: "November",
				dec: "December"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Month $mol_select
		 * 	no_options_message \Not found
		 * 	value? <=> month?
		 * 	dictionary <= months
		 * ```
		 */
		@ $mol_mem
		Month() {
			const obj = new this.$.$mol_select()
			
			obj.no_options_message = () => "Not found"
			obj.value = (next?: any) => this.month(next)
			obj.dictionary = () => this.months()
			
			return obj
		}
	}
	
}

