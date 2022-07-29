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
		 * sub /
		 * 	<= Dump_short
		 * 	<= Dump_long
		 * ```
		 */
		sub() {
			return [
				this.Dump_short(),
				this.Dump_long()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_list
		 * 	\dump
		 * 	\javascript
		 * 	\debug
		 * ```
		 */
		tags() {
			return [
				"$mol_list",
				"dump",
				"javascript",
				"debug"
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
	}
	
}

