namespace $ {
	export class $mol_check_expand extends $mol_check {

		/**
		 * ```tree
		 * minimal_height 40
		 * ```
		 */
		minimal_height() {
			return 40
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
		 * 	paddingLeft <= level_style \0px
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
		 * level_style \0px
		 * ```
		 */
		level_style() {
			return "0px"
		}

		/**
		 * ```tree
		 * checked?val <=> expanded?val false
		 * ```
		 */
		checked(val?: any) {
			return this.expanded(val)
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
		 * enabled <= expandable false
		 * ```
		 */
		enabled() {
			return this.expandable()
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
