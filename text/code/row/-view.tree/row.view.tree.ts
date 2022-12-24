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
		 * syntax null
		 * ```
		 */
		syntax() {
			return null as any
		}
		
		/**
		 * ```tree
		 * uri_resolve* \
		 * ```
		 */
		uri_resolve(id: any) {
			return ""
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
		 * Token* $mol_text_code_token
		 * 	type <= token_type*
		 * 	haystack <= token_text*
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
		 * Token_link* $mol_text_code_token_link
		 * 	haystack <= token_text*
		 * 	needle <= highlight
		 * 	uri <= token_uri*
		 * ```
		 */
		@ $mol_mem_key
		Token_link(id: any) {
			const obj = new this.$.$mol_text_code_token_link()
			
			obj.haystack = () => this.token_text(id)
			obj.needle = () => this.highlight()
			obj.uri = () => this.token_uri(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * find_pos* null
		 * ```
		 */
		find_pos(id: any) {
			return null as any
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
		 * token_type* \
		 * ```
		 */
		token_type(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * token_text* \
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
		
		/**
		 * ```tree
		 * token_uri* \
		 * ```
		 */
		token_uri(id: any) {
			return ""
		}
	}
	
}

