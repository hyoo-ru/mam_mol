namespace $ {
	export class $mol_button_copy extends $mol_button_minor {
		
		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
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
		 * Icon $mol_icon_clipboard_outline
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_clipboard_outline()
			
			return obj
		}
	}
	
}

