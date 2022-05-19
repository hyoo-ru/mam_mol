namespace $ {
	export class $mol_embed_native extends $mol_scroll {
		
		/**
		 * ```tree
		 * dom_name \object
		 * ```
		 */
		dom_name() {
			return "object"
		}
		
		/**
		 * ```tree
		 * window null
		 * ```
		 */
		window() {
			return null as any
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	data <= uri?val
		 * 	type <= mime
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				data: this.uri(),
				type: this.mime()
			}
		}
		
		/**
		 * ```tree
		 * sub / <= Fallback_link
		 * ```
		 */
		sub() {
			return [
				this.Fallback_link()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * uri?val \
		 * ```
		 */
		@ $mol_mem
		uri(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * mime \
		 * ```
		 */
		mime() {
			return ""
		}
		
		/**
		 * ```tree
		 * title?val \
		 * ```
		 */
		@ $mol_mem
		title(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Fallback_image $mol_image
		 * 	uri <= uri
		 * 	title <= title?val
		 * ```
		 */
		@ $mol_mem
		Fallback_image() {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => this.uri()
			obj.title = () => this.title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Fallback_link $mol_link
		 * 	uri <= uri
		 * 	sub / <= Fallback_image
		 * ```
		 */
		@ $mol_mem
		Fallback_link() {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => this.uri()
			obj.sub = () => [
				this.Fallback_image()
			] as readonly any[]
			
			return obj
		}
	}
	
}

