namespace $ {
	export class $mol_svg_title extends $mol_svg {
		
		/**
		 * ```tree
		 * dom_name \title
		 * ```
		 */
		dom_name() {
			return "title"
		}
		
		/**
		 * ```tree
		 * sub / <= title
		 * ```
		 */
		sub() {
			return [
				this.title()
			] as readonly any[]
		}
	}
	
}

