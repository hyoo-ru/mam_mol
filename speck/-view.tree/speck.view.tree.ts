namespace $ {
	export class $mol_speck extends $mol_view {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_theme \$mol_theme_accent
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_theme: "$mol_theme_accent"
			}
		}

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	minHeight \1em
		 * ```
		 */
		style() {
			return {
				...super.style(),
				minHeight: "1em"
			}
		}

		/**
		 * ```tree
		 * sub / <= value
		 * ```
		 */
		sub() {
			return [
				this.value()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * value null
		 * ```
		 */
		value() {
			return null as any
		}
	}

}
