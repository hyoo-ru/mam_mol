namespace $ {
	export class $mol_filler_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Prints large bulk of text
		 * ```
		 */
		title() {
			return "Prints large bulk of text"
		}
		
		/**
		 * ```tree
		 * sub / <= Filler
		 * ```
		 */
		sub() {
			return [
				this.Filler()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\filler
		 * 	\fake
		 * 	\lorem
		 * 	\ipsum
		 * 	\dolor
		 * ```
		 */
		tags() {
			return [
				"filler",
				"fake",
				"lorem",
				"ipsum",
				"dolor"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Filler $mol_filler min_symbols 6000
		 * ```
		 */
		@ $mol_mem
		Filler() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 6000
			
			return obj
		}
	}
	
}

