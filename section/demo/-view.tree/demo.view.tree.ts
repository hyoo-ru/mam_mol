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
		 * 	\container
		 * 	\header
		 * ```
		 */
		tags() {
			return [
				"container",
				"header"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Layout
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout"
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

