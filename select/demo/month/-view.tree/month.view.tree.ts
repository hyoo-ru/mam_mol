namespace $ {
	export class $mol_select_demo_month extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Month picker with filter
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_select_demo_month_title' )
		}

		/**
		 * ```tree
		 * sub / <= Month $mol_select
		 * 	no_options_message \Not found
		 * 	value?val <=> month?val \jan
		 * 	dictionary <= months *
		 * 		jan \January
		 * 		feb \February
		 * 		mar \March
		 * 		apr \April
		 * 		may \May
		 * 		jun \June
		 * 		jul \July
		 * 		aug \August
		 * 		sep \September
		 * 		oct \October
		 * 		nov \November
		 * 		dec \December
		 * ```
		 */
		sub() {
			return [
				this.Month()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Month $mol_select
		 * 	no_options_message \Not found
		 * 	value?val <=> month?val \jan
		 * 	dictionary <= months *
		 * 		jan \January
		 * 		feb \February
		 * 		mar \March
		 * 		apr \April
		 * 		may \May
		 * 		jun \June
		 * 		jul \July
		 * 		aug \August
		 * 		sep \September
		 * 		oct \October
		 * 		nov \November
		 * 		dec \December
		 * ```
		 */
		@ $mol_mem
		Month() {
			const obj = new this.$.$mol_select()

			obj.no_options_message = () => "Not found"
			obj.value = (val?: any) => this.month(val)
			obj.dictionary = () => this.months()

			return obj
		}

		/**
		 * ```tree
		 * month?val \jan
		 * ```
		 */
		@ $mol_mem
		month(val?: any) {
			if ( val !== undefined ) return val
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
			}
		}
	}

}
