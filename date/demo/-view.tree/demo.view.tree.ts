namespace $ {
	export class $mol_date_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Date
		 * 	<= Formatted
		 * ```
		 */
		sub() {
			return [
				this.Date(),
				this.Formatted()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\time
		 * 	\datepicker
		 * 	\format
		 * ```
		 */
		tags() {
			return [
				"time",
				"datepicker",
				"format"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control/Button/Picker
		 * 	\Type/Date
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button/Picker",
				"Type/Date"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * date? $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		date(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Date $mol_date value_moment? <=> date?
		 * ```
		 */
		@ $mol_mem
		Date() {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (next?: any) => this.date(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * formatted \
		 * ```
		 */
		formatted() {
			return ""
		}
		
		/**
		 * ```tree
		 * Formatted $mol_view sub / <= formatted
		 * ```
		 */
		@ $mol_mem
		Formatted() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.formatted()
			] as readonly any[]
			
			return obj
		}
	}
	
}

