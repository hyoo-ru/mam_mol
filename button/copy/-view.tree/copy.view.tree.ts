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
		 * sub /
		 * 	<= Icon
		 * 	<= title
		 * ```
		 */
		sub() {
			return [
				this.Icon(),
				this.title()
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
		
		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
	}
	
}

