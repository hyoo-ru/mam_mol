namespace $ {
	export class $mol_dump_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Attach files an show them
		 * ```
		 */
		title() {
			return "Attach files an show them"
		}
		
		/**
		 * ```tree
		 * sub / <= Dump_list
		 * ```
		 */
		sub() {
			return [
				this.Dump_list()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\dump
		 * 	\json
		 * 	\javascript
		 * 	\debug
		 * ```
		 */
		tags() {
			return [
				"dump",
				"json",
				"javascript",
				"debug"
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
		 * value null
		 * ```
		 */
		value() {
			return null as any
		}
		
		/**
		 * ```tree
		 * Dump_short $mol_dump_value value <= value
		 * ```
		 */
		@ $mol_mem
		Dump_short() {
			const obj = new this.$.$mol_dump_value()
			
			obj.value = () => this.value()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dump_long $mol_dump_value
		 * 	value <= value
		 * 	prototypes true
		 * ```
		 */
		@ $mol_mem
		Dump_long() {
			const obj = new this.$.$mol_dump_value()
			
			obj.value = () => this.value()
			obj.prototypes = () => true
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dump_list $mol_list rows /
		 * 	<= Dump_short
		 * 	<= Dump_long
		 * ```
		 */
		@ $mol_mem
		Dump_list() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Dump_short(),
				this.Dump_long()
			] as readonly any[]
			
			return obj
		}
	}
	
}

