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
		 * Row!id $mol_view
		 * 	sub <= row_content!id
		 * 	minimal_height 24
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.row_content(id)
			obj.minimal_height = () => 24

			return obj
		}

		/**
		 * ```tree
		 * Token!id $mol_text_code_token
		 * 	type <= token_type!id
		 * 	content <= token_content!id
		 * ```
		 */
		@ $mol_mem_key
		Token(id: any) {
			const obj = new this.$.$mol_text_code_token()

			obj.type = () => this.token_type(id)
			obj.content = () => this.token_content(id)

			return obj
		}

		/**
		 * ```tree
		 * row_content!id /
		 * ```
		 */
		row_content(id: any) {
			return [

			] as readonly any[]
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
		 * token_content!id /
		 * ```
		 */
		token_content(id: any) {
			return [

			] as readonly any[]
		}
	}

	export class $mol_text_code_token extends $mol_view {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_code_token_type <= type
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_code_token_type: this.type()
			}
		}

		/**
		 * ```tree
		 * sub <= content
		 * ```
		 */
		sub() {
			return this.content()
		}

		/**
		 * ```tree
		 * type \
		 * ```
		 */
		type() {
			return ""
		}

		/**
		 * ```tree
		 * content /
		 * ```
		 */
		content() {
			return [

			] as readonly any[]
		}
	}

}
