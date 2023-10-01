namespace $ {
	export class $mol_check_list extends $mol_view {
		
		/**
		 * ```tree
		 * dictionary *
		 * ```
		 */
		dictionary() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Option* $mol_check
		 * 	checked? <=> option_checked*?
		 * 	label <= option_label*
		 * 	enabled <= option_enabled*
		 * 	hint <= option_hint*
		 * 	minimal_height 24
		 * ```
		 */
		@ $mol_mem_key
		Option(id: any) {
			const obj = new this.$.$mol_check()
			
			obj.checked = (next?: any) => this.option_checked(id, next)
			obj.label = () => this.option_label(id)
			obj.enabled = () => this.option_enabled(id)
			obj.hint = () => this.option_hint(id)
			obj.minimal_height = () => 24
			
			return obj
		}
		
		/**
		 * ```tree
		 * options *
		 * ```
		 */
		options() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * keys /string
		 * ```
		 */
		keys() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * sub <= items
		 * ```
		 */
		sub() {
			return this.items()
		}
		
		/**
		 * ```tree
		 * option_checked*? false
		 * ```
		 */
		@ $mol_mem_key
		option_checked(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * option_title* \
		 * ```
		 */
		option_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * option_label* / <= option_title*
		 * ```
		 */
		option_label(id: any) {
			return [
				this.option_title(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * option_enabled* <= enabled
		 * ```
		 */
		option_enabled(id: any) {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * option_hint* \
		 * ```
		 */
		option_hint(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * items /$mol_check
		 * ```
		 */
		items() {
			return [
			] as readonly $mol_check[]
		}
	}
	
}

