namespace $ {
	export class $mol_expander_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Simple spoiler
		 * ```
		 */
		title() {
			return "Simple spoiler"
		}
		
		/**
		 * ```tree
		 * sub / <= Expander
		 * ```
		 */
		sub() {
			return [
				this.Expander()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_filler
		 * 	\expander
		 * 	\accordion
		 * 	\expand
		 * 	\container
		 * 	\fold
		 * ```
		 */
		tags() {
			return [
				"$mol_filler",
				"expander",
				"accordion",
				"expand",
				"container",
				"fold"
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
		 * Content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Expander $mol_expander
		 * 	title \Lorem Ipsum
		 * 	content / <= Content
		 * ```
		 */
		@ $mol_mem
		Expander() {
			const obj = new this.$.$mol_expander()
			
			obj.title = () => "Lorem Ipsum"
			obj.content = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
	}
	
}

