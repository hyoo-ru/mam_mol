namespace $ {
	export class $mol_embed_any extends $mol_view {
		
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
		 * Youtube $mol_embed_youtube
		 * 	title <= title
		 * 	uri <= uri
		 * ```
		 */
		@ $mol_mem
		Youtube() {
			const obj = new this.$.$mol_embed_youtube()
			
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

