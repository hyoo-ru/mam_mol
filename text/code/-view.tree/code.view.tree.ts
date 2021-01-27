namespace $ {
	export class $mol_text_code extends $mol_list {
		
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
		 * text_lines /string
		 * ```
		 */
		text_lines() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * Row!id $mol_text_code_row
		 * 	text <= row_text!id
		 * 	highlight <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_text_code_row()
			
			obj.text = () => this.row_text(id)
			obj.highlight = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_text!id \
		 * ```
		 */
		row_text(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
	}
	
}

