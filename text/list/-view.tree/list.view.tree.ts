namespace $ {
	export class $mol_text_list extends $mol_text {
		
		/**
		 * ```tree
		 * auto_scroll null
		 * ```
		 */
		auto_scroll() {
			return null as any
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_list_type <= type
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_list_type: this.type()
			}
		}
		
		/**
		 * ```tree
		 * Paragraph* $mol_text_list_item
		 * 	index <= item_index*
		 * 	sub <= block_content*
		 * ```
		 */
		@ $mol_mem_key
		Paragraph(id: any) {
			const obj = new this.$.$mol_text_list_item()
			
			obj.index = () => this.item_index(id)
			obj.sub = () => this.block_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * type \
		 * ```
		 */
		type() {
			return ""
		}
	}
	
	export class $mol_text_list_item extends $mol_paragraph {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_text_list_item_index <= index
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_text_list_item_index: this.index()
			}
		}
		
		/**
		 * ```tree
		 * index 0
		 * ```
		 */
		index() {
			return 0
		}
	}
	
}

