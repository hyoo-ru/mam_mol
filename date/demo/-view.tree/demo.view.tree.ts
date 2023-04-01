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
		 * 	\$mol_time_moment
		 * 	\date
		 * 	\datepicker
		 * 	\format
		 * ```
		 */
		tags() {
			return [
				"$mol_time_moment",
				"date",
				"datepicker",
				"format"
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
		 * date?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		date(val?: any) {
			if ( val !== undefined ) return val as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Date $mol_date value_moment?val <=> date?val
		 * ```
		 */
		@ $mol_mem
		Date() {
			const obj = new this.$.$mol_date()
			
			obj.value_moment = (val?: any) => this.date(val)
			
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

