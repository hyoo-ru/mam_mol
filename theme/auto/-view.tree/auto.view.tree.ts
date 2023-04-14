namespace $ {
	export class $mol_theme_auto extends $mol_plugin {
		
		/**
		 * ```tree
		 * attr * mol_theme <= theme
		 * ```
		 */
		attr() {
			return {
				mol_theme: this.theme()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * theme \
		 * ```
		 */
		theme() {
			return ""
		}
	}
	
}

