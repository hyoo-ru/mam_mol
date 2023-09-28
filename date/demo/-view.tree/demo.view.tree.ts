namespace $ {
	export class $mol_date_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Current
		 * 	<= Formatted
		 * 	<= Empty
		 * ```
		 */
		sub() {
			return [
				this.Current(),
				this.Formatted(),
				this.Empty()
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
		 * date_current? $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		date_current(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Current $mol_date value_moment? <=> date_current?
		 * ```
		 */
		@ $mol_mem
		Current() {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (next?: any) => this.date_current(next)
			
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
		
		/**
		 * ```tree
		 * date_empty? null
		 * ```
		 */
		@ $mol_mem
		date_empty(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Empty $mol_date value_moment? <=> date_empty?
		 * ```
		 */
		@ $mol_mem
		Empty() {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (next?: any) => this.date_empty(next)
			
			return obj
		}
	}
	
}

