namespace $ {
	export class $mol_link_source_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Link with icon
		 * ```
		 */
		title() {
			return "Link with icon"
		}
		
		/**
		 * ```tree
		 * sub / <= Blocks
		 * ```
		 */
		sub() {
			return [
				this.Blocks()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\link
		 * 	\icon
		 * 	\source
		 * 	\github
		 * 	\url
		 * ```
		 */
		tags() {
			return [
				"link",
				"icon",
				"source",
				"github",
				"url"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Navigation
		 * 	\Widget/Button
		 * ```
		 */
		aspects() {
			return [
				"Navigation",
				"Widget/Button"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * uri? \https://github.com/hyoo-ru/mam_mol/
		 * ```
		 */
		@ $mol_mem
		uri(next?: any) {
			if ( next !== undefined ) return next as never
			return "https://github.com/hyoo-ru/mam_mol/"
		}
		
		/**
		 * ```tree
		 * Input $mol_string value? <=> uri?
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.uri(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Output $mol_link_source uri <= uri?
		 * ```
		 */
		@ $mol_mem
		Output() {
			const obj = new this.$.$mol_link_source()
			
			obj.uri = () => this.uri()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Blocks $mol_list rows /
		 * 	<= Input
		 * 	<= Output
		 * ```
		 */
		@ $mol_mem
		Blocks() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Input(),
				this.Output()
			] as readonly any[]
			
			return obj
		}
	}
	
}

