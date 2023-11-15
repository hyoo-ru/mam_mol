namespace $ {
	export class $mol_page extends $mol_view {
		
		/**
		 * ```tree
		 * dom_name \article
		 * ```
		 */
		dom_name() {
			return "article"
		}
		
		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	tabIndex <= tabindex
		 * ```
		 */
		field() {
			return {
				...super.field(),
				tabIndex: this.tabindex()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= Body
		 * 	<= Foot
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Body(),
				this.Foot()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tabindex -1
		 * ```
		 */
		tabindex() {
			return -1
		}
		
		/**
		 * ```tree
		 * Logo null
		 * ```
		 */
		Logo() {
			return null as any
		}
		
		/**
		 * ```tree
		 * title_content /
		 * 	<= Logo
		 * 	<= title
		 * ```
		 */
		title_content() {
			return [
				this.Logo(),
				this.title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Title $mol_view
		 * 	dom_name \h1
		 * 	sub <= title_content
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_view()
			
			obj.dom_name = () => "h1"
			obj.sub = () => this.title_content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * tools /$mol_view_content
		 * ```
		 */
		tools() {
			return [
			] as readonly $mol_view_content[]
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
		 * Head $mol_view
		 * 	minimal_height 64
		 * 	dom_name \header
		 * 	sub <= head
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()
			
			obj.minimal_height = () => 64
			obj.dom_name = () => "header"
			obj.sub = () => this.head()
			
			return obj
		}
		
		/**
		 * ```tree
		 * body /$mol_view
		 * ```
		 */
		body() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Body_content $mol_list rows <= body
		 * ```
		 */
		@ $mol_mem
		Body_content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.body()
			
			return obj
		}
		
		/**
		 * ```tree
		 * body_content / <= Body_content
		 * ```
		 */
		body_content() {
			return [
				this.Body_content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * body_scroll_top?
		 * ```
		 */
		body_scroll_top(next?: any) {
			return this.Body().scroll_top(next)
		}
		
		/**
		 * ```tree
		 * Body $mol_scroll
		 * 	scroll_top? => body_scroll_top?
		 * 	sub <= body_content
		 * ```
		 */
		@ $mol_mem
		Body() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => this.body_content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * foot /$mol_view
		 * ```
		 */
		foot() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Foot $mol_view
		 * 	dom_name \footer
		 * 	sub <= foot
		 * ```
		 */
		@ $mol_mem
		Foot() {
			const obj = new this.$.$mol_view()
			
			obj.dom_name = () => "footer"
			obj.sub = () => this.foot()
			
			return obj
		}
	}
	
}

