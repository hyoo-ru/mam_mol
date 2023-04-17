namespace $ {
	export class $mol_pick_time_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub / <= Picker
		 * ```
		 */
		sub() {
			return [
				this.Picker()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_time_moment
		 * 	\timepicker
		 * 	\time
		 * 	\datetime
		 * ```
		 */
		tags() {
			return [
				"$mol_time_moment",
				"timepicker",
				"time",
				"datetime"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control/Button/Picker
		 * 	\Type/Time
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button/Picker",
				"Type/Time"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * moment? $mol_time_moment / \T01:23
		 * ```
		 */
		@ $mol_mem
		moment(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment(
				"T01:23"
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Picker $mol_pick_time value_moment? <=> moment?
		 * ```
		 */
		@ $mol_mem
		Picker() {
			const obj = new this.$.$mol_pick_time()
			
			obj.value_moment = (next?: any) => this.moment(next)
			
			return obj
		}
	}
	
}

