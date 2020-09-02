namespace $ {
	export class $mol_select_demo_priority extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Priority picker
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_select_demo_priority_title' )
		}

		/**
		 * ```tree
		 * sub / <= Priority
		 * ```
		 */
		sub() {
			return [
				this.Priority()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * priority?val \Lowest
		 * ```
		 */
		@ $mol_mem
		priority(val?: any) {
			if ( val !== undefined ) return val
			return "Lowest"
		}

		/**
		 * ```tree
		 * Priority $mol_select
		 * 	Filter null
		 * 	value?val <=> priority?val
		 * 	options /
		 * 		\Highest 
		 * 		\High
		 * 		\Medium
		 * 		\Low
		 * 		\Lowest
		 * ```
		 */
		@ $mol_mem
		Priority() {
			const obj = new this.$.$mol_select()

			obj.Filter = () => null as any
			obj.value = (val?: any) => this.priority(val)
			obj.options = () => [
				"Highest ",
				"High",
				"Medium",
				"Low",
				"Lowest"
			] as readonly any[]

			return obj
		}
	}

}
