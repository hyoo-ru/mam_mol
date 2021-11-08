namespace $ {
	export class $mol_section_demo extends $mol_demo {
		
		/**
		 * ```tree
		 * title @ \Section with header
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_section_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub / <= Section
		 * ```
		 */
		sub() {
			return [
				this.Section()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_filler
		 * 	\section
		 * 	\container
		 * 	\header
		 * ```
		 */
		tags() {
			return [
				"$mol_filler",
				"section",
				"container",
				"header"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Section_content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Section_content() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section $mol_section
		 * 	head / \Section header
		 * 	Content <= Section_content
		 * ```
		 */
		@ $mol_mem
		Section() {
			const obj = new this.$.$mol_section()
			
			obj.head = () => [
				"Section header"
			] as readonly any[]
			obj.Content = () => this.Section_content()
			
			return obj
		}
	}
	
}

