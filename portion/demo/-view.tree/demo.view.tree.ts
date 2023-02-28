namespace $ {
	export class $mol_portion_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Progress bar in various states
		 * ```
		 */
		title() {
			return "Progress bar in various states"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Empty
		 * 	<= Partial
		 * 	<= Full
		 * ```
		 */
		sub() {
			return [
				this.Empty(),
				this.Partial(),
				this.Full()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\dashboard
		 * 	\progress
		 * 	\slider
		 * ```
		 */
		tags() {
			return [
				"dashboard",
				"progress",
				"slider"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * fist 0
		 * ```
		 */
		fist() {
			return 0
		}
		
		/**
		 * ```tree
		 * Empty $mol_portion portion <= fist
		 * ```
		 */
		@ $mol_mem
		Empty() {
			const obj = new this.$.$mol_portion()
			
			obj.portion = () => this.fist()
			
			return obj
		}
		
		/**
		 * ```tree
		 * second 0.5
		 * ```
		 */
		second() {
			return 0.5
		}
		
		/**
		 * ```tree
		 * Partial $mol_portion portion <= second
		 * ```
		 */
		@ $mol_mem
		Partial() {
			const obj = new this.$.$mol_portion()
			
			obj.portion = () => this.second()
			
			return obj
		}
		
		/**
		 * ```tree
		 * third 1
		 * ```
		 */
		third() {
			return 1
		}
		
		/**
		 * ```tree
		 * Full $mol_portion portion <= third
		 * ```
		 */
		@ $mol_mem
		Full() {
			const obj = new this.$.$mol_portion()
			
			obj.portion = () => this.third()
			
			return obj
		}
	}
	
}

