namespace $ {
	export class $mol_app_demo extends $mol_book2 {
		
		/**
		 * ```tree
		 * editor_title <= detail_title
		 * ```
		 */
		editor_title() {
			return this.detail_title()
		}
		
		/**
		 * ```tree
		 * repo_dict *
		 * ```
		 */
		repo_dict() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * plugins /
		 * 	<= Theme
		 * 	<= Search_start
		 * ```
		 */
		plugins() {
			return [
				this.Theme(),
				this.Search_start()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * demo_block_list /
		 * 	\$mol_example_small
		 * 	\$mol_example_large
		 * ```
		 */
		demo_block_list() {
			return [
				"$mol_example_small",
				"$mol_example_large"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * search_start?
		 * ```
		 */
		search_start(next?: any) {
			return this.Menu().search_start(next)
		}
		
		/**
		 * ```tree
		 * Menu $mol_app_demo_menu
		 * 	title <= menu_title
		 * 	names <= names
		 * 	widget_tags* <= widget_tags*
		 * 	widget_aspects* <= widget_aspects*
		 * 	widget_title* <= widget_title*
		 * 	search_start? => search_start?
		 * 	tools <= tools
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_app_demo_menu()
			
			obj.title = () => this.menu_title()
			obj.names = () => this.names()
			obj.widget_tags = (id: any) => this.widget_tags(id)
			obj.widget_aspects = (id: any) => this.widget_aspects(id)
			obj.widget_title = (id: any) => this.widget_title(id)
			obj.tools = () => this.tools()
			
			return obj
		}
		
		/**
		 * ```tree
		 * chat_pages*
		 * ```
		 */
		chat_pages(id: any) {
			return this.Detail(id).chat_pages()
		}
		
		/**
		 * ```tree
		 * Detail* $mol_app_demo_detail
		 * 	chat_seed <= chat_seed*
		 * 	chat_pages => chat_pages*
		 * 	title <= detail_title
		 * 	description <= detail_description
		 * 	edit_uri <= edit_uri
		 * 	readme? <=> readme_page?
		 * 	Demo <= Demo
		 * ```
		 */
		@ $mol_mem_key
		Detail(id: any) {
			const obj = new this.$.$mol_app_demo_detail()
			
			obj.chat_seed = () => this.chat_seed(id)
			obj.title = () => this.detail_title()
			obj.description = () => this.detail_description()
			obj.edit_uri = () => this.edit_uri()
			obj.readme = (next?: any) => this.readme_page(next)
			obj.Demo = () => this.Demo()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Readme_page $mol_app_demo_readme
		 * 	repo <= repo
		 * 	opened? <=> readme_page?
		 * 	module <= module
		 * ```
		 */
		@ $mol_mem
		Readme_page() {
			const obj = new this.$.$mol_app_demo_readme()
			
			obj.repo = () => this.repo()
			obj.opened = (next?: any) => this.readme_page(next)
			obj.module = () => this.module()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Detail_empty_message $mol_status sub /
		 * 	<= detail_empty_prefix
		 * 	<= selected
		 * 	<= detail_empty_postfix
		 * ```
		 */
		@ $mol_mem
		Detail_empty_message() {
			const obj = new this.$.$mol_status()
			
			obj.sub = () => [
				this.detail_empty_prefix(),
				this.selected(),
				this.detail_empty_postfix()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * detail_title \$mol
		 * ```
		 */
		detail_title() {
			return "$mol"
		}
		
		/**
		 * ```tree
		 * Theme $mol_theme_auto
		 * ```
		 */
		@ $mol_mem
		Theme() {
			const obj = new this.$.$mol_theme_auto()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Search_start $mol_hotkey
		 * 	key * F? <=> search_start?
		 * 	mod_ctrl true
		 * ```
		 */
		@ $mol_mem
		Search_start() {
			const obj = new this.$.$mol_hotkey()
			
			obj.key = () => ({
				F: (next?: any) => this.search_start(next)
			} as Record< string, any >)
			obj.mod_ctrl = () => true
			
			return obj
		}
		
		/**
		 * ```tree
		 * menu_title @ \$mol examples
		 * ```
		 */
		menu_title() {
			return this.$.$mol_locale.text( '$mol_app_demo_menu_title' )
		}
		
		/**
		 * ```tree
		 * names /string
		 * ```
		 */
		names() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_tags* /string
		 * ```
		 */
		widget_tags(id: any) {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_aspects* /string
		 * ```
		 */
		widget_aspects(id: any) {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * widget_title* \
		 * ```
		 */
		widget_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * sources_uri \https://github.com/hyoo-ru/mam_mol/
		 * ```
		 */
		sources_uri() {
			return "https://github.com/hyoo-ru/mam_mol/"
		}
		
		/**
		 * ```tree
		 * Sources $mol_link_source uri <= sources_uri
		 * ```
		 */
		@ $mol_mem
		Sources() {
			const obj = new this.$.$mol_link_source()
			
			obj.uri = () => this.sources_uri()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Lights $mol_lights_toggle
		 * ```
		 */
		@ $mol_mem
		Lights() {
			const obj = new this.$.$mol_lights_toggle()
			
			return obj
		}
		
		/**
		 * ```tree
		 * tools /
		 * 	<= Sources
		 * 	<= Lights
		 * ```
		 */
		tools() {
			return [
				this.Sources(),
				this.Lights()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * chat_seed* \p9zx0v_nsmx1d
		 * ```
		 */
		chat_seed(id: any) {
			return "p9zx0v_nsmx1d"
		}
		
		/**
		 * ```tree
		 * detail_description \
		 * ```
		 */
		detail_description() {
			return ""
		}
		
		/**
		 * ```tree
		 * edit_uri \
		 * ```
		 */
		edit_uri() {
			return ""
		}
		
		/**
		 * ```tree
		 * readme_page? false
		 * ```
		 */
		@ $mol_mem
		readme_page(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Demo $mol_view
		 * ```
		 */
		@ $mol_mem
		Demo() {
			const obj = new this.$.$mol_view()
			
			return obj
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
		 * detail_empty_prefix @ \No one demo with prefix "
		 * ```
		 */
		detail_empty_prefix() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_empty_prefix' )
		}
		
		/**
		 * ```tree
		 * selected \
		 * ```
		 */
		selected() {
			return ""
		}
		
		/**
		 * ```tree
		 * detail_empty_postfix @ \"
		 * ```
		 */
		detail_empty_postfix() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_empty_postfix' )
		}
	}
	
}

