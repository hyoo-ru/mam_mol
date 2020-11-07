namespace $ {
	export class $mol_check_expand extends $mol_check {

		/**
		 * ```tree
		 * minimal_height 32
		 * ```
		 */
		minimal_height() {
			return 32
		}

		/**
		 * ```tree
		 * Icon $mol_icon_chevron
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_chevron()

			return obj
		}

		/**
		 * ```tree
		 * level 0
		 * ```
		 */
		level() {
			return 0
		}

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	paddingLeft <= level_style
		 * ```
		 */
		style() {
			return {
				...super.style(),
				paddingLeft: this.level_style()
			}
		}

		/**
		 * ```tree
		 * checked?val <=> expanded?val
		 * ```
		 */
		checked(val?: any) {
			return this.expanded(val)
		}

		/**
		 * ```tree
		 * enabled <= expandable
		 * ```
		 */
		enabled() {
			return this.expandable()
		}

		/**
		 * ```tree
		 * level_style \0px
		 * ```
		 */
		level_style() {
			return "0px"
		}

		/**
		 * ```tree
		 * expanded?val false
		 * ```
		 */
		@ $mol_mem
		expanded(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * expandable false
		 * ```
		 */
		expandable() {
			return false
		}
	}

}
