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
		 * sub / <= Dump
		 * ```
		 */
		sub() {
			return [
				this.Dump()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\dump
		 * 	\javascript
		 * 	\debug
		 * ```
		 */
		tags() {
			return [
				"dump",
				"javascript",
				"debug"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Dump $mol_dump_value value <= sub
		 * ```
		 */
		@ $mol_mem
		Dump() {
			const obj = new this.$.$mol_dump_value()
			
			obj.value = () => this.sub()
			
			return obj
		}
	}
	
}

