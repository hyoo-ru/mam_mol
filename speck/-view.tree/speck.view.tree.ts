namespace $ {
	export class $mol_speck extends $mol_view {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_theme <= theme
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_theme: this.theme()
			} as Record< string, any >
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
			} as Record< string, any >
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
		 * theme \$mol_theme_accent
		 * ```
		 */
		theme() {
			return "$mol_theme_accent"
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

