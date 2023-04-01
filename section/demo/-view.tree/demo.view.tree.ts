namespace $ {
	export class $mol_section_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Section with header
		 * ```
		 */
		title() {
			return "Section with header"
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
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
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
		 * 	title \Section header
		 * 	content / <= Section_content
		 * ```
		 */
		@ $mol_mem
		Section() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Section header"
			obj.content = () => [
				this.Section_content()
			] as readonly any[]
			
			return obj
		}
	}
	
}

