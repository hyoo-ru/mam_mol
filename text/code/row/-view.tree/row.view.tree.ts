namespace $ {
	export class $mol_text_code_row extends $mol_paragraph {
		
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
		 * minimal_height 24
		 * ```
		 */
		minimal_height() {
			return 24
		}
		
		/**
		 * ```tree
		 * numb_showed true
		 * ```
		 */
		numb_showed() {
			return true
		}
		
		/**
		 * ```tree
		 * Numb $mol_view sub / <= numb
		 * ```
		 */
		@ $mol_mem
		Numb() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.numb()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Token!id $mol_text_code_token
		 * 	type <= token_type!id
		 * 	haystack <= token_text!id
		 * 	needle <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Token(id: any) {
			const obj = new this.$.$mol_text_code_token()
			
			obj.type = () => this.token_type(id)
			obj.haystack = () => this.token_text(id)
			obj.needle = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Token_link!id $mol_text_code_token_link
		 * 	haystack <= token_text!id
		 * 	needle <= highlight
		 * ```
		 */
		@ $mol_mem_key
		Token_link(id: any) {
			const obj = new this.$.$mol_text_code_token_link()
			
			obj.haystack = () => this.token_text(id)
			obj.needle = () => this.highlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * numb 0
		 * ```
		 */
		numb() {
			return 0
		}
		
		/**
		 * ```tree
		 * token_type!id \
		 * ```
		 */
		token_type(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * token_text!id \
		 * ```
		 */
		token_text(id: any) {
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

