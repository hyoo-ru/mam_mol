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
		 * tags / \select
		 * ```
		 */
		tags() {
			return [
				"select"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * month?val \jan
		 * ```
		 */
		@ $mol_mem
		month(val?: any) {
			if ( val !== undefined ) return val as never
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
		
		/**
		 * ```tree
		 * Month $mol_select
		 * 	no_options_message \Not found
		 * 	value?val <=> month?val
		 * 	dictionary <= months
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
	}
	
}

