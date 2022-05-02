namespace $ {
	export class $mol_text_code extends $mol_list {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_code_sidebar_showed <= sidebar_showed
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_code_sidebar_showed: this.sidebar_showed()
			}
		}
		
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
		 * Row* $mol_text_code_row
		 * 	numb_showed <= sidebar_showed
		 * 	numb <= row_numb*
		 * 	text <= row_text*
		 * 	highlight <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_text_code_row()
			
			obj.numb_showed = () => this.sidebar_showed()
			obj.numb = () => this.row_numb(id)
			obj.text = () => this.row_text(id)
			obj.highlight = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * sidebar_showed false
		 * ```
		 */
		sidebar_showed() {
			return false
		}
		
		/**
		 * ```tree
		 * row_numb* 0
		 * ```
		 */
		row_numb(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * row_text* \
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

