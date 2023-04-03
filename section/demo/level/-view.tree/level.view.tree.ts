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
		 * sub / <= Section1
		 * ```
		 */
		sub() {
			return [
				this.Section1()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Section1 $mol_section
		 * 	level 1
		 * 	title \Level 1
		 * 	content /
		 * 		<= Section1_text
		 * 		<= Section2
		 * ```
		 */
		@ $mol_mem
		Section1() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 1
			obj.title = () => "Level 1"
			obj.content = () => [
				this.Section1_text(),
				this.Section2()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section2 $mol_section
		 * 	level 2
		 * 	title \Level 2
		 * 	content /
		 * 		<= Section2_text
		 * 		<= Section3
		 * ```
		 */
		@ $mol_mem
		Section2() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 2
			obj.title = () => "Level 2"
			obj.content = () => [
				this.Section2_text(),
				this.Section3()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section3 $mol_section
		 * 	level 3
		 * 	title \Level 3
		 * 	content /
		 * 		<= Section3_text
		 * 		<= Section4
		 * ```
		 */
		@ $mol_mem
		Section3() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 3
			obj.title = () => "Level 3"
			obj.content = () => [
				this.Section3_text(),
				this.Section4()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section4 $mol_section
		 * 	level 4
		 * 	title \Level 4
		 * 	content /
		 * 		<= Section4_text
		 * 		<= Section5
		 * ```
		 */
		@ $mol_mem
		Section4() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 4
			obj.title = () => "Level 4"
			obj.content = () => [
				this.Section4_text(),
				this.Section5()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section5 $mol_section
		 * 	level 5
		 * 	title \Level 5
		 * 	content /
		 * 		<= Section5_text
		 * 		<= Section6
		 * ```
		 */
		@ $mol_mem
		Section5() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 5
			obj.title = () => "Level 5"
			obj.content = () => [
				this.Section5_text(),
				this.Section6()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section6 $mol_section
		 * 	level 6
		 * 	title \Level 6
		 * 	content /
		 * 		<= Section6_text
		 * 		<= Section7
		 * ```
		 */
		@ $mol_mem
		Section6() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 6
			obj.title = () => "Level 6"
			obj.content = () => [
				this.Section6_text(),
				this.Section7()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section7 $mol_section
		 * 	level 7
		 * 	title \Level 7
		 * 	content / <= Section7_text
		 * ```
		 */
		@ $mol_mem
		Section7() {
			const obj = new this.$.$mol_section()
			
			obj.level = () => 7
			obj.title = () => "Level 7"
			obj.content = () => [
				this.Section7_text()
			] as readonly any[]
			
			return obj
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
		 * Section1_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section1_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section2_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section2_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section3_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section3_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section4_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section4_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section5_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section5_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section6_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section6_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section7_text $mol_filler min_symbols 250
		 * ```
		 */
		@ $mol_mem
		Section7_text() {
			const obj = new this.$.$mol_filler()
			
			obj.min_symbols = () => 250
			
			return obj
		}
	}
	
}

