namespace $ {
	export class $mol_section_demo_level extends $mol_example_small {
		
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
		 * sub /
		 * 	<= Section_h1
		 * 	<= Section_h2
		 * 	<= Section_h3
		 * 	<= Section_h4
		 * 	<= Section_h5
		 * 	<= Section_h6
		 * 	<= Section_h7
		 * ```
		 */
		sub() {
			return [
				this.Section_h1(),
				this.Section_h2(),
				this.Section_h3(),
				this.Section_h4(),
				this.Section_h5(),
				this.Section_h6(),
				this.Section_h7()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\section
		 * 	\header
		 * 	\level
		 * 	\h1
		 * ```
		 */
		tags() {
			return [
				"section",
				"header",
				"level",
				"h1"
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
		 * Section_h1_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h1_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h1 $mol_section
		 * 	level 1
		 * 	title \Section h1
		 * 	content / <= Section_h1_content
		 * ```
		 */
		@ $mol_mem
		Section_h1() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 1
			obj.title = () => "Section h1"
			obj.content = () => [
				this.Section_h1_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h2_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h2_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h2 $mol_section
		 * 	level 2
		 * 	title \Section h2
		 * 	content / <= Section_h2_content
		 * ```
		 */
		@ $mol_mem
		Section_h2() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 2
			obj.title = () => "Section h2"
			obj.content = () => [
				this.Section_h2_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h3_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h3_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h3 $mol_section
		 * 	level 3
		 * 	title \Section h3
		 * 	content / <= Section_h3_content
		 * ```
		 */
		@ $mol_mem
		Section_h3() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 3
			obj.title = () => "Section h3"
			obj.content = () => [
				this.Section_h3_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h4_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h4_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h4 $mol_section
		 * 	level 4
		 * 	title \Section h4
		 * 	content / <= Section_h4_content
		 * ```
		 */
		@ $mol_mem
		Section_h4() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 4
			obj.title = () => "Section h4"
			obj.content = () => [
				this.Section_h4_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h5_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h5_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h5 $mol_section
		 * 	level 5
		 * 	title \Section h5
		 * 	content / <= Section_h5_content
		 * ```
		 */
		@ $mol_mem
		Section_h5() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 5
			obj.title = () => "Section h5"
			obj.content = () => [
				this.Section_h5_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h6_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h6_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h6 $mol_section
		 * 	level 6
		 * 	title \Section h6
		 * 	content / <= Section_h6_content
		 * ```
		 */
		@ $mol_mem
		Section_h6() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 6
			obj.title = () => "Section h6"
			obj.content = () => [
				this.Section_h6_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h7_content $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section_h7_content() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_h7 $mol_section
		 * 	level 7
		 * 	title \Section h7
		 * 	content / <= Section_h7_content
		 * ```
		 */
		@ $mol_mem
		Section_h7() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 7
			obj.title = () => "Section h7"
			obj.content = () => [
				this.Section_h7_content()
			] as readonly any[]
			
			return obj
		}
	}
	
}

