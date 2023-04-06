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
		 * 	decoding <= decoding
		 * 	crossOrigin <= cors
		 * ```
		 */
		field() {
			return {
				...super.field(),
				src: this.uri(),
				alt: this.title(),
				loading: this.loading(),
				decoding: this.decoding(),
				crossOrigin: this.cors()
			}
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	width <= natural_width?
		 * 	height <= natural_height?
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				width: this.natural_width(),
				height: this.natural_height()
			}
		}
		
		/**
		 * ```tree
		 * event * load? <=> load?
		 * ```
		 */
		event() {
			return {
				load: (next?: any) => this.load(next)
			}
		}
		
		/**
		 * ```tree
		 * minimal_width 16
		 * ```
		 */
		minimal_width() {
			return 16
		}
		
		/**
		 * ```tree
		 * minimal_height 16
		 * ```
		 */
		minimal_height() {
			return 16
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
		
		/**
		 * ```tree
		 * decoding \async
		 * ```
		 */
		decoding() {
			return "async"
		}
		
		/**
		 * ```tree
		 * cors null
		 * ```
		 */
		cors() {
			return null as any
		}
		
		/**
		 * ```tree
		 * natural_width? 0
		 * ```
		 */
		@ $mol_mem
		natural_width(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * natural_height? 0
		 * ```
		 */
		@ $mol_mem
		natural_height(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * load? null
		 * ```
		 */
		@ $mol_mem
		load(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
	}
	
}

