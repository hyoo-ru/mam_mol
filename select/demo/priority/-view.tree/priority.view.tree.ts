namespace $ {
	export class $mol_select_demo_priority extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Priority picker
		 * ```
		 */
		title() {
			return "Priority picker"
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
		 * tags /
		 * 	\select
		 * 	\priority
		 * ```
		 */
		tags() {
			return [
				"select",
				"priority"
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
		 * priority? \Lowest
		 * ```
		 */
		@ $mol_mem
		priority(next?: any) {
			if ( next !== undefined ) return next as never
			return "Lowest"
		}
		
		/**
		 * ```tree
		 * Priority $mol_select
		 * 	Filter null
		 * 	value? <=> priority?
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
			obj.value = (next?: any) => this.priority(next)
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

