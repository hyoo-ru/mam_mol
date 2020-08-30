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
		 * 	src <= uri \
		 * 	allow <= allow \
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
		 * uri \
		 * ```
		 */
		uri() {
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
	}

}
