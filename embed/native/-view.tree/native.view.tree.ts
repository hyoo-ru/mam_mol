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
		 * sub / <= title?val
		 * ```
		 */
		sub() {
			return [
				this.title()
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
	}
	
}

