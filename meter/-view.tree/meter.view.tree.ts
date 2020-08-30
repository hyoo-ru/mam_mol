namespace $ {
	export class $mol_meter extends $mol_plugin {

		/**
		 * ```tree
		 * zoom 1
		 * ```
		 */
		zoom() {
			return 1
		}


		/**
		 * ```tree
		 * width?val 0
		 * ```
		 */
		@ $mol_mem
		width(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * height?val 0
		 * ```
		 */
		@ $mol_mem
		height(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}


		/**
		 * ```tree
		 * left?val 0
		 * ```
		 */
		@ $mol_mem
		left(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * right?val 0
		 * ```
		 */
		@ $mol_mem
		right(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * bottom?val 0
		 * ```
		 */
		@ $mol_mem
		bottom(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * top?val 0
		 * ```
		 */
		@ $mol_mem
		top(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}
	}

}
