namespace $ {
	export class $mol_embed_native extends $mol_scroll {
		
		/**
		 * ```tree
		 * uri? \
		 * ```
		 */
		@ $mol_mem
		uri(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
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
		 * 	data <= uri
		 * 	type <= mime
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				data: this.uri(),
				type: this.mime()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub / <= Fallback
		 * ```
		 */
		sub() {
			return [
				this.Fallback()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * message * hashchange? <=> uri_change?
		 * ```
		 */
		message() {
			return {
				hashchange: (next?: any) => this.uri_change(next)
			} as Record< string, any >
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
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
		
		/**
		 * ```tree
		 * Fallback $mol_link
		 * 	uri <= uri
		 * 	sub / <= title
		 * ```
		 */
		@ $mol_mem
		Fallback() {
			const obj = new this.$.$mol_link()
			
			obj.uri = () => this.uri()
			obj.sub = () => [
				this.title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * uri_change? null
		 * ```
		 */
		@ $mol_mem
		uri_change(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
	}
	
}

