namespace $ {
	export class $mol_link_source extends $mol_link {
		
		/**
		 * ```tree
		 * hint @ \Source code
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_link_source_hint' )
		}
		
		/**
		 * ```tree
		 * sub / <= Icon
		 * ```
		 */
		sub() {
			return [
				this.Icon()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Icon $mol_icon_script_text
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_script_text()
			
			return obj
		}
	}
	
}

