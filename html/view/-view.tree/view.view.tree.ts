namespace $ {
	export class $mol_html_view extends $mol_list {
		
		/**
		 * ```tree
		 * html \
		 * ```
		 */
		html() {
			return ""
		}
		
		/**
		 * ```tree
		 * dom null
		 * ```
		 */
		dom() {
			return null as any
		}
		
		/**
		 * ```tree
		 * safe_link* \
		 * ```
		 */
		safe_link(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * xss_uri \https://en.wikipedia.org/wiki/XSS#
		 * ```
		 */
		xss_uri() {
			return "https://en.wikipedia.org/wiki/XSS#"
		}
		
		/**
		 * ```tree
		 * Heading* $mol_html_view_heading
		 * 	level <= heading_level*
		 * 	sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Heading(id: any) {
			const obj = new this.$.$mol_html_view_heading()
			
			obj.level = () => this.heading_level(id)
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Paragraph* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Paragraph(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * List* $mol_list rows <= content*
		 * ```
		 */
		@ $mol_mem_key
		List(id: any) {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Quote* $mol_list rows <= content*
		 * ```
		 */
		@ $mol_mem_key
		Quote(id: any) {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Strong* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Strong(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Emphasis* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Emphasis(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Deleted* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Deleted(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Inserted* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Inserted(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Code* $mol_paragraph sub <= content*
		 * ```
		 */
		@ $mol_mem_key
		Code(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link* $mol_link_iconed
		 * 	uri <= link_uri*
		 * 	content <= content*
		 * ```
		 */
		@ $mol_mem_key
		Link(id: any) {
			const obj = new this.$.$mol_link_iconed()
			
			obj.uri = () => this.link_uri(id)
			obj.content = () => this.content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Image* $mol_image uri <= image_uri*
		 * ```
		 */
		@ $mol_mem_key
		Image(id: any) {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => this.image_uri(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Break* $mol_paragraph sub /
		 * ```
		 */
		@ $mol_mem_key
		Break(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => [
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Text* $mol_dimmer
		 * 	needle <= highlight
		 * 	haystack <= text*
		 * ```
		 */
		@ $mol_mem_key
		Text(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.needle = () => this.highlight()
			obj.haystack = () => this.text(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * heading_level* 1
		 * ```
		 */
		heading_level(id: any) {
			return 1
		}
		
		/**
		 * ```tree
		 * content* /
		 * ```
		 */
		content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * link_uri* \
		 * ```
		 */
		link_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * image_uri* \
		 * ```
		 */
		image_uri(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
		
		/**
		 * ```tree
		 * text* \
		 * ```
		 */
		text(id: any) {
			return ""
		}
	}
	
	export class $mol_html_view_heading extends $mol_paragraph {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_html_view_heading <= level
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_html_view_heading: this.level()
			}
		}
		
		/**
		 * ```tree
		 * level 1
		 * ```
		 */
		level() {
			return 1
		}
	}
	
}

