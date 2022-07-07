namespace $ {
	export class $mol_frame extends $mol_embed_native {
		
		/**
		 * ```tree
		 * dom_name \iframe
		 * ```
		 */
		dom_name() {
			return "iframe"
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	data null
		 * 	type null
		 * 	src <= uri?val
		 * 	srcdoc <= html
		 * 	allow <= allow
		 * 	allowFullscreen <= fullscreen
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				data: null as any,
				type: null as any,
				src: this.uri(),
				srcdoc: this.html(),
				allow: this.allow(),
				allowFullscreen: this.fullscreen()
			}
		}
		
		/**
		 * ```tree
		 * accelerometer true
		 * ```
		 */
		accelerometer() {
			return true
		}
		
		/**
		 * ```tree
		 * autoplay true
		 * ```
		 */
		autoplay() {
			return true
		}
		
		/**
		 * ```tree
		 * encription true
		 * ```
		 */
		encription() {
			return true
		}
		
		/**
		 * ```tree
		 * gyroscope true
		 * ```
		 */
		gyroscope() {
			return true
		}
		
		/**
		 * ```tree
		 * pip true
		 * ```
		 */
		pip() {
			return true
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
		 * html null
		 * ```
		 */
		html() {
			return null as any
		}
		
		/**
		 * ```tree
		 * allow \
		 * ```
		 */
		allow() {
			return ""
		}
		
		/**
		 * ```tree
		 * fullscreen true
		 * ```
		 */
		fullscreen() {
			return true
		}
	}
	
}

