namespace $ {
	export class $mol_button_download extends $mol_button_minor {
		
		/**
		 * ```tree
		 * blob null
		 * ```
		 */
		blob() {
			return null as any
		}
		
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
		 * file_name \blob.bin
		 * ```
		 */
		file_name() {
			return "blob.bin"
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
		 * Icon $mol_icon_download
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_download()
			
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

