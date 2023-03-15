namespace $ {
	export class $mol_button_copy extends $mol_button_minor {
		
		/**
		 * ```tree
		 * text <= title
		 * ```
		 */
		text() {
			return this.title()
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
		 * title \
		 * ```
		 */
		title() {
			return ""
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

