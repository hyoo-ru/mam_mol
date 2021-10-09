namespace $ {
	export class $mol_button_share extends $mol_button_minor {
		
		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
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
		 * Icon $mol_icon_share_variant
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_share_variant()
			
			return obj
		}
	}
	
}

