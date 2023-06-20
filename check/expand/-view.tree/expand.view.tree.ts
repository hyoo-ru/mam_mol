namespace $ {
	export class $mol_check_expand extends $mol_check {
		
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
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * checked? <=> expanded?
		 * ```
		 */
		checked(next?: any) {
			return this.expanded(next)
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
		 * expanded? false
		 * ```
		 */
		@ $mol_mem
		expanded(next?: any) {
			if ( next !== undefined ) return next as never
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

