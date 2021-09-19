namespace $ {
	export class $mol_link_iconed_demo extends $mol_list {
		
		/**
		 * ```tree
		 * title @ \Link with icon
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_link_iconed_demo_title' )
		}
		
		/**
		 * ```tree
		 * rows /
		 * 	<= Input
		 * 	<= Output
		 * ```
		 */
		rows() {
			return [
				this.Input(),
				this.Output()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * uri?val \https://www.google.com/search?q=%24mol
		 * ```
		 */
		@ $mol_mem
		uri(val?: any) {
			if ( val !== undefined ) return val as never
			return "https://www.google.com/search?q=%24mol"
		}
		
		/**
		 * ```tree
		 * Input $mol_string value?val <=> uri?val
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_string()
			
			obj.value = (val?: any) => this.uri(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Output $mol_link_iconed uri <= uri?val
		 * ```
		 */
		@ $mol_mem
		Output() {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.uri()
			
			return obj
		}
	}
	
}

