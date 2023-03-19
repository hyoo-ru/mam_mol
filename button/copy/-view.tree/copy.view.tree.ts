namespace $ {
	export class $mol_button_copy extends $mol_button_minor {
		
		/**
		 * ```tree
		 * data *
		 * 	text/plain <= text_blob?
		 * 	text/html <= html_blob?
		 * ```
		 */
		data() {
			return {
				"text/plain": this.text_blob(),
				"text/html": this.html_blob()
			}
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
		 * text <= title
		 * ```
		 */
		text() {
			return this.title()
		}
		
		/**
		 * ```tree
		 * text_blob? $mol_blob /
		 * 	/BlobPart <= text
		 * 	* type \text/plain
		 * ```
		 */
		@ $mol_mem
		text_blob(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_blob(
				[
					this.text()
				] as readonly BlobPart[],
				{
					type: "text/plain"
				}
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * html \
		 * ```
		 */
		html() {
			return ""
		}
		
		/**
		 * ```tree
		 * html_blob? $mol_blob /
		 * 	/BlobPart <= html
		 * 	* type \text/html
		 * ```
		 */
		@ $mol_mem
		html_blob(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_blob(
				[
					this.html()
				] as readonly BlobPart[],
				{
					type: "text/html"
				}
			)
			
			return obj
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

