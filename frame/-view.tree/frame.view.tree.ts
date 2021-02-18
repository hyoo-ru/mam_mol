namespace $ {
	export class $mol_frame extends $mol_view {
		
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
		 * 	src <= uri?val
		 * 	allow <= allow
		 * ```
		 */
		attr() {
			return {
				src: this.uri(),
				allow: this.allow()
			}
		}
		
		/**
		 * ```tree
		 * fullscreen true
		 * ```
		 */
		fullscreen() {
			return true
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
			if ( val !== undefined ) return val
			return ""
		}
		
		/**
		 * ```tree
		 * allow \
		 * ```
		 */
		allow() {
			return ""
		}
	}
	
}

