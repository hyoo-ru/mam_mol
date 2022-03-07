namespace $ {
	export class $mol_image extends $mol_view {
		
		/**
		 * ```tree
		 * dom_name \img
		 * ```
		 */
		dom_name() {
			return "img"
		}
		
		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	src <= uri
		 * 	alt <= title
		 * 	loading <= loading
		 * ```
		 */
		field() {
			return {
				...super.field(),
				src: this.uri(),
				alt: this.title(),
				loading: this.loading()
			}
		}
		
		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
		}
		
		/**
		 * ```tree
		 * loading \eager
		 * ```
		 */
		loading() {
			return "eager"
		}
	}
	
}

