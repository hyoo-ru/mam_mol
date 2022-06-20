namespace $ {
	export class $mol_embed_any extends $mol_ghost {
		
		/**
		 * ```tree
		 * Image $mol_image
		 * 	title <= title
		 * 	uri <= uri
		 * ```
		 */
		@ $mol_mem
		Image() {
			const obj = new this.$.$mol_image()
			
			obj.title = () => this.title()
			obj.uri = () => this.uri()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Object $mol_embed_native
		 * 	title <= title
		 * 	uri <= uri
		 * ```
		 */
		@ $mol_mem
		Object() {
			const obj = new this.$.$mol_embed_native()
			
			obj.title = () => this.title()
			obj.uri = () => this.uri()
			
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
		
		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
		}
	}
	
}

