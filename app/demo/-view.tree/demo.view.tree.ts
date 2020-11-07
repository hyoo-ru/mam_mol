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
		 * source_prefix \https://github.com/eigenmethod/mol/tree/master/
		 * ```
		 */
		source_prefix() {
			return "https://github.com/eigenmethod/mol/tree/master/"
		}

		/**
		 * ```tree
		 * Main $mol_app_demo_main
		 * ```
		 */
		@ $mol_mem
		Main() {
			const obj = new this.$.$mol_app_demo_main()

			return obj
		}

		/**
		 * ```tree
		 * pages <= blocks
		 * ```
		 */
		pages() {
			return this.blocks()
		}

		/**
		 * ```tree
		 * plugins / <= Theme
		 * ```
		 */
		plugins() {
			return [
				this.Theme()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Menu $mol_app_demo_menu
		 * 	hierarchy <= nav_hierarchy
		 * 	option!id <= nav_option!id
		 * 	filter?val <=> filter_string?val
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_app_demo_menu()

			obj.hierarchy = () => this.nav_hierarchy()
			obj.option = (id: any) => this.nav_option(id)
			obj.filter = (val?: any) => this.filter_string(val)

			return obj
		}

		/**
		 * ```tree
		 * Detail!id $mol_app_demo_detail
		 * 	title <= detail_title
		 * 	source_link <= source_link
		 * 	body /
		 * 		<= Detail_list
		 * 		- <= Chat
		 * ```
		 */
		@ $mol_mem_key
		Detail(id: any) {
			const obj = new this.$.$mol_app_demo_detail()

			obj.title = () => this.detail_title()
			obj.source_link = () => this.source_link()
			obj.body = () => [
				this.Detail_list(),
				// <=
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Editor!id $mol_app_studio
		 * 	title <= editor_title
		 * 	class_name_base <= selected_class_name
		 * 	tools_main / <= Close
		 * ```
		 */
		@ $mol_mem_key
		Editor(id: any) {
			const obj = new this.$.$mol_app_studio()

			obj.title = () => this.editor_title()
			obj.class_name_base = () => this.selected_class_name()
			obj.tools_main = () => [
				this.Close()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Welcome $mol_scroll sub / <= Welcome_text
		 * ```
		 */
		@ $mol_mem
		Welcome() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Welcome_text()
			] as readonly any[]

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
		 * blocks /
		 * ```
		 */
		blocks() {
			return [

			] as readonly any[]
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
		 * nav_hierarchy null
		 * ```
		 */
		nav_hierarchy() {
			return null as any
		}

		/**
		 * ```tree
		 * nav_option!id null
		 * ```
		 */
		nav_option(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * filter_string?val \
		 * ```
		 */
		@ $mol_mem
		filter_string(val?: any) {
			if ( val !== undefined ) return val
			return ""
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
		 * main_content /
		 * ```
		 */
		main_content() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Detail_list $mol_list rows <= main_content
		 * ```
		 */
		@ $mol_mem
		Detail_list() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.main_content()

			return obj
		}

		/**
		 * ```tree
		 * chat_link \
		 * ```
		 */
		chat_link() {
			return ""
		}

		/**
		 * ```tree
		 * Chat $mol_chat
		 * 	repository_name \nin-jin/mol_chat
		 * 	title <= title
		 * 	link <= chat_link
		 * ```
		 */
		@ $mol_mem
		Chat() {
			const obj = new this.$.$mol_chat()

			obj.repository_name = () => "nin-jin/mol_chat"
			obj.title = () => this.title()
			obj.link = () => this.chat_link()

			return obj
		}

		/**
		 * ```tree
		 * selected_class_name \
		 * ```
		 */
		selected_class_name() {
			return ""
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
		 * close_arg * edit null
		 * ```
		 */
		close_arg() {
			return {
				edit: null as any
			}
		}

		/**
		 * ```tree
		 * Close $mol_link
		 * 	sub / <= Close_icon
		 * 	arg <= close_arg
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()

			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			obj.arg = () => this.close_arg()

			return obj
		}

		/**
		 * ```tree
		 * welcome_text \
		 * ```
		 */
		welcome_text() {
			return ""
		}

		/**
		 * ```tree
		 * Welcome_text $mol_text text <= welcome_text
		 * ```
		 */
		@ $mol_mem
		Welcome_text() {
			const obj = new this.$.$mol_text()

			obj.text = () => this.welcome_text()

			return obj
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

	export class $mol_app_demo_menu extends $mol_page {

		/**
		 * ```tree
		 * title @ \Demos
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_app_demo_menu_title' )
		}

		/**
		 * ```tree
		 * tools / <= Filter
		 * ```
		 */
		tools() {
			return [
				this.Filter()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Head
		 * 	<= Nav
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Nav()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * filter?val \
		 * ```
		 */
		@ $mol_mem
		filter(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Filter $mol_search query?val <=> filter?val
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_search()

			obj.query = (val?: any) => this.filter(val)

			return obj
		}

		/**
		 * ```tree
		 * hierarchy null
		 * ```
		 */
		hierarchy() {
			return null as any
		}

		/**
		 * ```tree
		 * option!id null
		 * ```
		 */
		option(id: any) {
			return null as any
		}

		/**
		 * ```tree
		 * Nav $mol_app_demo_nav
		 * 	hierarchy <= hierarchy
		 * 	record!id <= option!id
		 * 	needle <= filter?val
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_app_demo_nav()

			obj.hierarchy = () => this.hierarchy()
			obj.record = (id: any) => this.option(id)
			obj.needle = () => this.filter()

			return obj
		}
	}

	export class $mol_app_demo_detail extends $mol_page {

		/**
		 * ```tree
		 * tools /
		 * 	<= Source_link
		 * 	- <= Edit
		 * 	<= Close
		 * ```
		 */
		tools() {
			return [
				this.Source_link(),
				// <=
				this.Close()
			] as readonly any[]
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
			return this.$.$mol_locale.text( '$mol_app_demo_detail_source_hint' )
		}

		/**
		 * ```tree
		 * Source_icon $mol_icon_code_braces
		 * ```
		 */
		@ $mol_mem
		Source_icon() {
			const obj = new this.$.$mol_icon_code_braces()

			return obj
		}

		/**
		 * ```tree
		 * Source_button $mol_button_major
		 * 	hint <= source_hint
		 * 	sub / <= Source_icon
		 * ```
		 */
		@ $mol_mem
		Source_button() {
			const obj = new this.$.$mol_button_major()

			obj.hint = () => this.source_hint()
			obj.sub = () => [
				this.Source_icon()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Source_link $mol_link
		 * 	uri <= source_link
		 * 	target \_blank
		 * 	sub / <= Source_button
		 * ```
		 */
		@ $mol_mem
		Source_link() {
			const obj = new this.$.$mol_link()

			obj.uri = () => this.source_link()
			obj.target = () => "_blank"
			obj.sub = () => [
				this.Source_button()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * edit_hint @ \Edit this demo online
		 * ```
		 */
		edit_hint() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_edit_hint' )
		}

		/**
		 * ```tree
		 * Edit_speck $mol_speck value \β
		 * ```
		 */
		@ $mol_mem
		Edit_speck() {
			const obj = new this.$.$mol_speck()

			obj.value = () => "β"

			return obj
		}

		/**
		 * ```tree
		 * Edit_icon $mol_icon_settings
		 * ```
		 */
		@ $mol_mem
		Edit_icon() {
			const obj = new this.$.$mol_icon_settings()

			return obj
		}

		/**
		 * ```tree
		 * Edit $mol_link
		 * 	hint <= edit_hint
		 * 	sub /
		 * 		<= Edit_speck
		 * 		<= Edit_icon
		 * 	arg *
		 * 		edit \
		 * 		path \
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_link()

			obj.hint = () => this.edit_hint()
			obj.sub = () => [
				this.Edit_speck(),
				this.Edit_icon()
			] as readonly any[]
			obj.arg = () => ({
				edit: "",
				path: ""
			})

			return obj
		}

		/**
		 * ```tree
		 * close_hint @ \Close panel
		 * ```
		 */
		close_hint() {
			return this.$.$mol_locale.text( '$mol_app_demo_detail_close_hint' )
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
		 * close_arg * demo null
		 * ```
		 */
		close_arg() {
			return {
				demo: null as any
			}
		}

		/**
		 * ```tree
		 * Close $mol_link
		 * 	hint <= close_hint
		 * 	sub / <= Close_icon
		 * 	arg <= close_arg
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()

			obj.hint = () => this.close_hint()
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			obj.arg = () => this.close_arg()

			return obj
		}
	}

	export class $mol_app_demo_nav extends $mol_grid {

		/**
		 * ```tree
		 * hierarchy_col \title
		 * ```
		 */
		hierarchy_col() {
			return "title"
		}

		/**
		 * ```tree
		 * Head null
		 * ```
		 */
		Head() {
			return null as any
		}


		/**
		 * ```tree
		 * Option!id $mol_link
		 * 	arg <= arg!id
		 * 	sub /
		 * 		<= Expand!id
		 * 		<= Content!id
		 * ```
		 */
		@ $mol_mem_key
		Option(id: any) {
			const obj = new this.$.$mol_link()

			obj.arg = () => this.arg(id)
			obj.sub = () => [
				this.Expand(id),
				this.Content(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * arg!id *
		 * ```
		 */
		arg(id: any) {
			return {

			}
		}

		/**
		 * ```tree
		 * Expand!id $mol_check_expand
		 * 	expanded?val <=> cell_expanded!id?val
		 * 	level <= cell_level!id
		 * ```
		 */
		@ $mol_mem_key
		Expand(id: any) {
			const obj = new this.$.$mol_check_expand()

			obj.expanded = (val?: any) => this.cell_expanded(id, val)
			obj.level = () => this.cell_level(id)

			return obj
		}

		/**
		 * ```tree
		 * Content!id $mol_view sub / <= cell_content!id
		 * ```
		 */
		@ $mol_mem_key
		Content(id: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.cell_content(id)
			] as readonly any[]

			return obj
		}
	}

}
