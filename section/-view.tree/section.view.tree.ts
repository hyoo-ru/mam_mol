namespace $ {
	export class $mol_section extends $mol_list {
		
		/**
		 * ```tree
		 * level 1
		 * ```
		 */
		level() {
			return 1
		}
		
		/**
		 * ```tree
		 * rows /
		 * 	<= Head
		 * 	<= Content
		 * ```
		 */
		rows() {
			return [
				this.Head(),
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * title_dom_name \h1
		 * ```
		 */
		title_dom_name() {
			return "h1"
		}
		
		/**
		 * ```tree
		 * Title $mol_paragraph
		 * 	dom_name <= title_dom_name
		 * 	title <= title
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_paragraph()
			
			obj.dom_name = () => this.title_dom_name()
			obj.title = () => this.title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * tools /
		 * ```
		 */
		tools() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Tools $mol_view sub <= tools
		 * ```
		 */
		@ $mol_mem
		Tools() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.tools()
			
			return obj
		}
		
		/**
		 * ```tree
		 * head /
		 * 	<= Title
		 * 	<= Tools
		 * ```
		 */
		head() {
			return [
				this.Title(),
				this.Tools()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Head $mol_view sub <= head
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.head()
			
			return obj
		}
		
		/**
		 * ```tree
		 * content /
		 * ```
		 */
		content() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows <= content
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.content()
			
			return obj
		}
	}
	
}

