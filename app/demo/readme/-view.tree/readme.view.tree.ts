namespace $ {
	export class $mol_app_demo_readme extends $mol_page {
		
		/**
		 * ```tree
		 * readme_link_template \https://raw.githubusercontent.com/{repo}/HEAD/{module}/readme.md
		 * ```
		 */
		readme_link_template() {
			return "https://raw.githubusercontent.com/{repo}/HEAD/{module}/readme.md"
		}
		
		/**
		 * ```tree
		 * source_link_template \https://github.com/{repo}/tree/HEAD/{module}
		 * ```
		 */
		source_link_template() {
			return "https://github.com/{repo}/tree/HEAD/{module}"
		}
		
		/**
		 * ```tree
		 * repo \
		 * ```
		 */
		repo() {
			return ""
		}
		
		/**
		 * ```tree
		 * module /string
		 * ```
		 */
		module() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * title @ \Readme
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_app_demo_readme_title' )
		}
		
		/**
		 * ```tree
		 * opened? false
		 * ```
		 */
		@ $mol_mem
		opened(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * tools /
		 * 	<= Source_link
		 * 	<= Close
		 * ```
		 */
		tools() {
			return [
				this.Source_link(),
				this.Close()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Readme $mol_text
		 * 	text <= readme
		 * 	uri_base <= uri_base?
		 * ```
		 */
		@ $mol_mem
		Readme() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.readme()
			obj.uri_base = () => this.uri_base()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Not_found $mol_view sub / <= Not_found_caption
		 * ```
		 */
		@ $mol_mem
		Not_found() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Not_found_caption()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * source_link \
		 * ```
		 */
		source_link() {
			return ""
		}
		
		/**
		 * ```tree
		 * source_hint @ \Source code of this demo
		 * ```
		 */
		source_hint() {
			return this.$.$mol_locale.text( '$mol_app_demo_readme_source_hint' )
		}
		
		/**
		 * ```tree
		 * Source_link $mol_link_source
		 * 	uri <= source_link
		 * 	hint <= source_hint
		 * ```
		 */
		@ $mol_mem
		Source_link() {
			const obj = new this.$.$mol_link_source()
			
			obj.uri = () => this.source_link()
			obj.hint = () => this.source_hint()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Close_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * close? null
		 * ```
		 */
		@ $mol_mem
		close(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Close $mol_button_minor
		 * 	hint @ \Close panel
		 * 	sub / <= Close_icon
		 * 	click? <=> close?
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.$.$mol_locale.text( '$mol_app_demo_readme_Close_hint' )
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			obj.click = (next?: any) => this.close(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * readme \
		 * ```
		 */
		readme() {
			return ""
		}
		
		/**
		 * ```tree
		 * uri_base? \
		 * ```
		 */
		@ $mol_mem
		uri_base(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Not_found_caption @ \Readme not found
		 * ```
		 */
		Not_found_caption() {
			return this.$.$mol_locale.text( '$mol_app_demo_readme_Not_found_caption' )
		}
	}
	
}

